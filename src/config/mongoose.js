const mongoose = require('mongoose');
// server localhost
const server = process.env.DB_HOST;
// server port
const port = process.env.DB_PORT;
// default name
const database = process.env.DB_NAME;
/**
 * Singleton class to init mongoose database
 */
class Database {
  constructor() {
    this._connect()
  }

  async _connect() {
    // connect when init
    try {
      let connectionString = `mongodb://${server}/${database}`;
      // connect to database with server and database name
      if (process.env.NODE_ENV === 'production') {
        connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gssvw.gcp.mongodb.net/${database}?retryWrites=true&w=majority`;
        console.log(connectionString);
      }
      await mongoose.connect(connectionString, { useNewUrlParser: true });
      // confirm connection
      console.log('Database connection successful');
    } catch (e) {
      // if any error, log in the console
      console.log(e);
      console.error('Database connection error');
    }
  }
}
// export singleton instance 
module.exports = new Database();