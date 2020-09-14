import Mongoose, { Schema } from 'mongoose';

export interface SuperGrid9kUser {
  _id: string;
  username: string;
  email: string;
  tbn: string;
  bio: string;
}

const UserSchema = new Schema({
  username: { type: String, required: [true, 'Username missing'] },
  email: { type: String, required: [true, 'Username missing'] },
  tbn: { type: String, required: [true, 'Username missing'] },
  bio: { type: String, required: [true, 'Username missing'] },
});

const UserModel: Mongoose.Model<Mongoose.Document & SuperGrid9kUser> =
  Mongoose.models.User || Mongoose.model('User', UserSchema);

export default UserModel;
