import mongoose, { Schema, Document } from "mongoose";

interface ISession extends Document {
  user: Schema.Types.ObjectId;
  loginTime: Date;
  logoutTime: Date;
  ipAddress: string;
}

const SessionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  ipAddress: { type: String, required: true },
});

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
