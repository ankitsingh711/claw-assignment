import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: { product: Schema.Types.ObjectId; quantity: number }[];
  total: number;
  status: string;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
