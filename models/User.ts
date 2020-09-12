import Mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Missing User Id'],
  },
  displayName: String,
  userName: String,
});

const UserModel = Mongoose.models.User || Mongoose.model('User', UserSchema);

export default UserModel;
