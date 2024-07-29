import mongoose from "mongoose";

interface IUser extends Document {
  name: string,
  email: string;
  password: string,
  role: 'user' | 'admin'
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user'
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser };
