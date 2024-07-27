import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: {
      enum: ["user", "admin"],
    },
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
