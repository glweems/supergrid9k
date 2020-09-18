import 'colors';
import mongoose from 'mongoose';

const { MONGO_URL: uri } = process.env;

export default async function dbConnect() {
  /* check if we have connection to our databse*/
  if (mongoose.connections[0].readyState) {
    return;
  }

  /* connecting to our database */

  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection is open to '.america, uri);
  });

  mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection has occured ' + err + ' error');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });
}
