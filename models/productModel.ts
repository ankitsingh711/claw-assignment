import mongoose, { Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
