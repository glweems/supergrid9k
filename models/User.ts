import Mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { SuperGrid9kUser } from '../lib/auth/mapUserData';
import { GridSchema } from './Grid';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username missing'],
      unique: true,
      min: [3, 'Username too short'],
    },
    email: { type: String, required: [true, 'Email missing'], validate: (str) => validator.isEmail(str) },
    tbn: { type: String },
    bio: { type: String, required: false, default: '' },
    grids: {
      type: [GridSchema],
      default: [],
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const UserModel: Mongoose.Model<Mongoose.Document & SuperGrid9kUser> =
  Mongoose.models.User || Mongoose.model('User', UserSchema);

export default UserModel;
