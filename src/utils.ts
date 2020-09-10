/* This is a database connection function*/
import mongoose, { ConnectionOptions } from 'mongoose';

const connection: { isConnected?: number } = {}; /* creating connection object*/
const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;

console.log('MONGO_PATH: ', MONGO_PATH);
console.log('MONGO_PASSWORD: ', MONGO_PASSWORD);
console.log('MONGO_USER: ', MONGO_USER);

const connectionOptions: ConnectionOptions = {
  dbName: MONGO_DATABASE,
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connectionUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}`;

export async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */

  return await mongoose
    .connect(connectionUri, connectionOptions)
    .then((ob) => {
      connection.isConnected = ob.connection.readyState;
      console.log(ob);
    })
    .catch((err) => {
      console.log('err: ', err);
      throw new Error(err);
    });
}

export default dbConnect;
