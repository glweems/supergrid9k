import Mongoose, { Schema } from 'mongoose';
import validator from 'validator';

export interface SuperGrid9kUser {
  _id: string;
  username: string;
  email: string;
  tbn: string;
  bio: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username missing'],
      unique: true,
      min: [6, 'Username too short'],
      validate: (str) => validator.isEmail(str),
    },
    email: { type: String, required: [true, 'Email missing'] },
    tbn: { type: String },
    bio: { type: String, required: false, default: '' },
  },
  { timestamps: true, validateBeforeSave: true }
);

const UserModel: Mongoose.Model<Mongoose.Document & SuperGrid9kUser> =
  Mongoose.models.User || Mongoose.model('User', UserSchema);

export default UserModel;
