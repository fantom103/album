const fs = require('fs');

const AWS = require('aws-sdk');


AWS.config.loadFromPath('./aws.config.json');

const s3 = new AWS.S3();

/*
s3.listBuckets((err, data) => {
  if (err) {
    console.log(err, err.stack);
    return;
  }

  console.log(data);
});
*/


const params = {
  Bucket: 'amazonalbum.devrealms.com',
  Key: 'sample-5.jpg',
  ACL: 'public-read',
  Body: fs.createReadStream('upload/sample-2.jpg'),
  ContentType: 'image/jpeg'
};

s3.upload(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


// const result = s3.getResourceUrl('amazonalbum.devrealms.com', 'sample-2.jpg');