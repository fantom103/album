const documentdb = require('documentdb');

const DocumentClient = documentdb.DocumentClient;

const endpoint = 'https://album-docdb.documents.azure.com:443/';

const authKey = 'PD2vfKJjiq64wGgfY7FnjJ5kTqVpqSOoZqPGkgtKzLcgS6' +
  'FH1NRoXKR6qByMdGZICN0xUA3VwX64fbg84qoaGw';

const client = new DocumentClient(endpoint, {
  masterKey: authKey
});

const databaseDefinition = {id: 'PhotoAlbum2'};
const collectionDefinition = {id: 'AlbumUsers'};
const sampleDocument = {
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

client.createDatabase(databaseDefinition, (err, db) => {
  if (err) {
    console.log(err, err.stack);
    return;
  }
  console.log('DB created!');

  client.createCollection(db._self, collectionDefinition, (err, col) => {

    if (err) {
      console.log(err, err.stack);
      return;
    }
    console.log('Collection created!');

    client.createDocument(col._self, sampleDocument, (err, doc) => {
      if (err) {
        console.log(err, err.stack);
        return;
      }
      console.log('Document created!');

      const query = 'SELECT * FROM docs d';

      client.queryDocuments(col._self, query).toArray((err, res) => {
        if (err) {
          console.log(err, err.stack);
          return;
        }
        console.log(res);
      });
    });

  });
});