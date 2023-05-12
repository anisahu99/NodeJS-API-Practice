const { MongoClient } = require("mongodb");
const url = "mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/?retryWrites=true&w=majority";
const connectionString = process.env.url;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
module.exports = {
    connectToServer: function (callback) {
      client.connect(function (err, db) {
        if (err || !db) {
          return callback(err);
        }
  
        dbConnection = db.db("sample_airbnb");
        console.log("Successfully connected to MongoDB.");
  
        return callback();
      });
    },
  
    getDb: function () {
      return dbConnection;
    },
  };