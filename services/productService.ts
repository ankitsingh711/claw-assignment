import Product from '../models/productModel';

export const createProduct = async (name: string, description: string, price: number, stock_quantity: number) => {
    const product = new Product({ name, description, price, stock_quantity });
    await product.save();
    return product;
};

export const getAllProducts = async () => {
    return await Product.find();
};

export const updateProduct = async (id: string, updates: any) => {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};
