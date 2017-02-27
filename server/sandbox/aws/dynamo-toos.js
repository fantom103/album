
class DynamoTools {

  constructor(dynamo, docClient) {
    this._dynamo = dynamo;
    this._docClient = docClient;
  }

  deleteDb(name) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName : "AlbumUsers"
      };

      this._dynamo.deleteTable(params, (err, data) => {
      });
    });
  }

  createDb(name, hashKey, rangeKey) {
    
  }
}