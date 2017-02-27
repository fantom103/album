const documentdb = require('documentdb');
const DocdbStore = require('../../src/utils/docdb-store');


const DocumentClient = documentdb.DocumentClient;

const endpoint = 'https://album-docdb.documents.azure.com:443/';
const authKey = 'PD2vfKJjiq64wGgfY7FnjJ5kTqVpqSOoZqPGkgtKzLcgS6' +
  'FH1NRoXKR6qByMdGZICN0xUA3VwX64fbg84qoaGw';

const client = new DocumentClient(endpoint, {
  masterKey: authKey
});


/*
 * Initial setup
 */

const log = console.log.bind(console);
const store = new DocdbStore(client);

store.deletePhoto(null, 'e5f10723-2e3f-4347-bcda-13bc6dff8704')
  .then(log).catch(log);

return;

/*
const store = new DocdbStore(client, false);
store.setup()
  .then(() => {
   console.log('Document DB is set for album');
  })
  .catch((err) => {
    console.log('Could not init DocumentDB', err);
  });
*/
/*
const store = new DocdbStore(client, false);
store.findDb('PhotoAlbum')
  .then(console.log)
  .catch(console.log);
*/

/*store
  .tearDown()
  .then(() => {
    console.log('Deleted DB');
  })
  .catch((err) => {
    console.log(err);
  });
*/


const photos = [
  {
    path: 'https://albumphotos.blob.core.windows.net/photos-1/wolf-girl.jpg',
    title: 'Princess Mononoke',
    id: '90a51480-9cb5-4a73-8c44-de46f6b21222',
  },
  {
    path: 'https://albumphotos.blob.core.windows.net/photos-1/mage.jpg',
    title: 'Fire Mage',
    id: "5b9c6b47-a259-48ae-9c66-0526af6bbef0"
  },
  {
    path: 'https://albumphotos.blob.core.windows.net/photos-1/thief.jpg',
    title: 'Thief',
    id: "09c0116a-c24d-43a7-9f93-50e9a2b4d653"
  },
  {
    path: 'https://albumphotos.blob.core.windows.net/photos-1/rogue.jpg',
    title: 'Rogue',
    id: "7814c912-d544-4753-b863-8df694598a87"
  }
];

const turing = {
  id: 'turing',
  email: 'turing@devrealms.com',
  pass: 'pass',
  firstName: 'Alan',
  lastName: 'Turing',
  nick: 'turing',
  about: 'Can you prove that you are human?',
  address: '43 Adlington Road, Wilmslow',
  followers: [],
  following: []
};

const neuromancer = {
  id: 'neuro',
  email: 'neuromancer@devrealms.com',
  pass: 'pass',
  firstName: 'Neuromancer',
  lastName: 'Smith',
  nick: 'neuro',
  about: 'Artificial intelligence will rule the world',
  address: 'Freeside',
  followers: [],
  following: []
};

const wintermute = {
  id: 'winter',
  email: 'wintermute@devrealms.com',
  pass: 'pass',
  firstName: 'Wintermute',
  lastName: 'AI has no surname',
  nick: 'winter',
  address: 'Big Data Center',
  about: 'Programming is a form of mental yoga',
  followers: [],
  following: []
};

const users = [turing, neuromancer, wintermute];

// ------ Initialization of data model ---------

function addAllUsers() {
  const userAddPromises = users.map((u) => {
    return store.addUser(u.email, u.pass, u.firstName, u.lastName, u.nick, u.about, u.address)
      .then((user) => {
        console.log('User created', user.nick);
      });
  });

  return Promise
    .all(userAddPromises)
    .then((data) => {
      console.log('All users added');
    })
    .catch((err) => {
      console.log(err, err.stack);
    });
}

function addPhoto(target, photo) {
  console.log('Adding', photo.title, 'to', target.nick);

  return store
    .addPhoto(photo.path, photo.title, target.id, target.nick)
    .then(() => {
      console.log('Added', photo.title, 'to', target.nick);
    })
}

function follow(follower, target) {
  return store.followUser(follower.id, target.id)
    .then(() => {
      console.log(follower.id, 'is following', target.id);
    });
}

/*
addAllUsers()
  .then(() => console.log('Users added'))
  .then(() => addPhoto(wintermute, photos[0]))
  .then(() => addPhoto(wintermute, photos[1]))
  .then(() => addPhoto(neuromancer, photos[2]))
  .then(() => addPhoto(turing, photos[3]))
  .then(() => follow(wintermute, neuromancer))
  .then(() => follow(turing, wintermute))
  .then(() => follow(turing, neuromancer));
*/