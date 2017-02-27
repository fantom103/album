const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  "accessKeyId": "AKIAIFQAUXZTTAPXLRJA",
  "secretAccessKey": "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",

});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName : "AlbumUsers",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

const photoTableParams = {
  TableName : "AlbumPhotos",
  KeySchema: [
    { AttributeName: "owner", KeyType: "HASH"},
    { AttributeName: "id", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(photoTableParams, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});