import Mongoose, { Model, model, Schema } from 'mongoose';
import validator from 'validator';
import { GridSchema } from './Grid';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username missing'],
      unique: true,
      min: [3, 'Username too short'],
    },
    email: {
      type: String,
      required: [true, 'Email missing'],
      validate: (str) => validator.isEmail(str),
    },
    tbn: { type: String },
    bio: { type: String, required: false, default: '' },
    grids: {
      type: [GridSchema],
      default: [],
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const UserModel: Model<Mongoose.Document & any> =
  Mongoose.models.User || model('User', UserSchema);

export default UserModel;
