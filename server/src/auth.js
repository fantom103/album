const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');
const UserStore = require('./user-store');

const store = new UserStore();

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log('Serialize user', user.getId());
    done(null, user.getId());
  });

  passport.deserializeUser(function(id, done) {
    console.log('Deserialize user');

    process.nextTick(() => {
      done(null, store.getUserById(id));
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

        if (req.user) {
          const user = req.user; // pull the user out of the session

          // update the current users facebook credentials
          user.local.email = email;
          user.local.password = user.generateHash(password);

          // save the user
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        } else {

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({'local.email': email}, function (err, user) {
            // if there are any errors, return the error
            if (err)
              return done(err);

            // check to see if theres already a user with that email
            if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

              // if there is no user with that email
              // create the user
              var newUser = new User();

              // set the user's local credentials
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(function (err) {
                if (err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
        }
      });
    }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      process.nextTick(() => {
        const user = store.findUser(email, password);
        if (!user) {
          done(null, false);
          return;
        }

        done(null, user);

      });
    }));
};