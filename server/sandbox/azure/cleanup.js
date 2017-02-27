
const documentdb = require('documentdb');

const DocumentClient = documentdb.DocumentClient;

const endpoint = 'https://album-docdb.documents.azure.com:443/';

const authKey = 'PD2vfKJjiq64wGgfY7FnjJ5kTqVpqSOoZqPGkgtKzLcgS6' +
  'FH1NRoXKR6qByMdGZICN0xUA3VwX64fbg84qoaGw';

const client = new DocumentClient(endpoint, {
  masterKey: authKey
});

/*
client.queryDatabases(`SELECT * FROM root r`).toArray( (err, res) => {
  if (err) {
    console.log(err, err.stack);
    return;
  }

  console.log(res);
});
*/

// dbs/YlEWAA==/
// dbs/MFR5AA==/

/*
client.deleteDatabase('dbs/ztAoAA==/', function(err) {
  if(err) {
    console.log(err);
  }

  console.log('DB Deleted');
});
*/
