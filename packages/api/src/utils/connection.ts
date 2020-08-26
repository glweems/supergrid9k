import { ConnectionOptions } from "mongoose";

const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;

export const connectionOptions: ConnectionOptions = {
  appname: "Super Grid 9k",
  dbName: MONGO_DATABASE,
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connectionUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}`;
