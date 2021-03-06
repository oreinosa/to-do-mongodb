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
      // connect to database with server and database name
      let connectionString = 'mongodb://localhost:27017/to-do';
      if (process.env.NODE_ENV === 'production') {
        connectionString = process.env.MONGO_URI;
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