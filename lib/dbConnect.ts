import 'colors';
import Mongoose from 'mongoose';
/* connecting to our database */
Mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open to '.yellow, uri.cyan);
});

Mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection has occured '.red + err + ' error');
});

Mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', function () {
  Mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});
const { MONGO_URL: uri } = process.env;

export default async function dbConnect() {
  /* check if we have connection to our databse*/
  if (Mongoose.connections[0].readyState) {
    console.log('Connected'.blue);
    return;
  }

  await Mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}
