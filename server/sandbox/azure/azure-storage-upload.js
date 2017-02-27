const storage = require('azure-storage');
const path = require('path');
const blobSvc = storage.createBlobService(
  'albumphotos', 'BzjKg4/VURhvlAKC0TSKRqM3+urAVJgoJX5BcUEVN0UE' +
  'gITVA4nvwpQ4EfGfg+NBSDsMQqlIAl8vaG+vKoWYew==');

/**
blobSvc.createContainerIfNotExists('photos-1', {publicAccessLevel : 'blob'},
  (err, result, response) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(result);
  }
);
 */

const filePath = `/Users/juriy/dev/album/server/upload/sample-1.jpg`;

blobSvc.createBlockBlobFromLocalFile('photos-1', 'sample-2.jpg',
  filePath, {
    contentSettings: {
      contentType: 'image/jpg'
    }
  },
  (err, result, response) => {
    if(err){
      console.log(err);
      return;
    }

    console.log(result);
    console.log(response);
  }
);