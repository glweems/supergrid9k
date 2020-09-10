/* This is a database connection function*/
import mongoose, { Mongoose } from 'mongoose';
type DbConnectionObj = Mongoose & { isConnected?: number };

let connection: DbConnectionObj = null; /* creating connection object*/

export default async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection?.isConnected) {
    return;
  }

  /* connecting to our database */
  const { MONGODB_URI } = process.env;

  const db = await mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((config) => {
      console.log('Connected To Database');
      return config;
    });

  if (!db) console.error('failed to connect...');
  else connection = { ...db, isConnected: db.connection.readyState };
}
