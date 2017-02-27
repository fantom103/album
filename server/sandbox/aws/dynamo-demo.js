const fs = require('fs');
const AWS = require('aws-sdk');
const DynamoStore = require('./src/utils/dynamo-store');
const { users, photos } = require('./mock-data');

AWS.config.loadFromPath('./aws.config.json');

const docClient = new AWS.DynamoDB.DocumentClient();
const store = new DynamoStore(docClient);


const userAddPromises = users.map((u) => {
  return store.addUser(u.email, u.pass, u.firstName, u.lastName, u.nick, u.about)
    .then((user) => {
      console.log('User created', user.nick);
    });
});

Promise
  .all(userAddPromises)
  .then((data) => {
    console.log('Users Added!');
  })
  .catch((err) => {
    console.log(err, err.stack);
  });

const photoAddPromises = photos.map((p) => {
  return store.addPhoto(p.path, p.title, p.owner, p.nick)
    .then(() => {
      console.log('Added', p.title);
    })
});

Promise
  .all(photoAddPromises)
  .then((data) => {
    console.log('Photos Added!');
  })
  .catch((err) => {
    console.log(err, err.stack);
  });



/*
// Add photo to the album
var params = {
  TableName: "AlbumUsers",
  Key:{
    "id": "acb2db43-3a4a-4692-9194-ddf6c25823b2",
    "email": "juriy@devrealms.com"
  },
  UpdateExpression : "SET #attrName = list_append(#attrName, :attrValue)",
  ExpressionAttributeNames : {
    "#attrName" : "album"
  },
  ExpressionAttributeValues : {
    ":attrValue" : [
      {
        path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/8a3f98b930b1db74d810ba07e16fbb98.jpg',
        title: 'Fire Mage',
        id: "5b9c6b47-a259-48ae-9c66-0526af6bbef0"
      }
    ]
  },
  ReturnValues: "UPDATED_NEW"
};

console.log("Conditional update");
docClient.update(params, reportResult);
*/

/**
 // Delete user
 */
/*
const params = {
  TableName: "AlbumUsers",
  Key:{
    "id": "acb2db43-3a4a-4692-9194-ddf6c25823b2",
    "email": "juriy@devrealms.com"
  }
};

console.log("Deleting item");
docClient.delete(params, reportResult);
*/
/*
const params = {
  TableName: "Photos",
  Item: {
    id:  "09c0116a-c24d-43a7-9f93-50e9a2b4d653",
    title: 'Thief',
    owner:
    path:
    album:  [
      {
        path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/cad3d9370165ac5ba895364eab0e16ce.jpg',
        title: 'Thief',
        id: "09c0116a-c24d-43a7-9f93-50e9a2b4d653"
      },
      {
        path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/8926ea10c49537ebeacbee3bfff8e685.jpg',
        title: 'Rogue',
        id: "7814c912-d544-4753-b863-8df694598a87"
      }
    ]
  }
};
console.log("Deleting item");
docClient.delete(params, reportResult);

*/


/*
const store = new DynamoStore(docClient);


store.getPhotos(photographerId, true)
  .then((data) => {
    console.log('Got', data.length, 'photos!');
  })
  .catch((err) => {
    console.log('Could not get photos');
  });

*/

/*
samplePhotos.forEach((photo) => {
  store.addPhoto(photo.path, photo.title, photo.owner)
    .then(() => {
      console.log('Added', photo.title);
    })
    .catch((err) => {
      console.log('Error adding', photo.title);
    });
});
*/



 // Follow-unfollow

/*
store.followUser(photographerId, peterId)
  .then(() => {
    console.log('Following!');
  })
  .catch((err) => {
    console.log('Error');
  });
*/
/*

// UPDATE AND DELETE

store.findUserById('accbc4fa-a7b5-42ab-a3ca-bd2a2d03b797')
  .then((user) => {
    user.pass = 'UpdatedPass';
    return store.updateUser(user);
  })
  .then((user) => {
    console.log('Updated!');
  })
  .catch((e) => {
    console.log('Error')
  });

 */


/*
store.findUsersByEmail('neuromancer@gmail.com')
  .then((data) => {
    console.log('Result here');
  })
  .catch((err) => {
    console.log('Error');
  });
*/
/*
store.findUser('neuromancer@gmail.com', 'neuromancer')
  .then((data) => {
    console.log('Result here');
  })
  .catch((err) => {
    console.log('Error');
  });
*/
/*
*/
/*
store
  .findUserById('4045d2a7-8488-4c77-af37-f13e2961bee4')
  .then((data) => {
    console.log('Got User');
  })
  .catch((err) => {
    console.log(err);
  });
*/

/*
store.deleteUser('4045d2a7-8488-4c77-af37-f13e2961bee4')
  .then((data) => {
    console.log('Deleted User');
  })
  .catch((err) => {
    console.log(err);
  });
*/
