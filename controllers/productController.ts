import { Request, Response } from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../services/productService';

export const create = async (req: Request, res: Response) => {
    
    const { name, description, price, stock_quantity } = req.body;
    
    try {
        const product = await createProduct(name, description, price, stock_quantity);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    console.log('this is id and updates', id, updates);
    
    
    try {
        const product = await updateProduct(id, updates);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        await deleteProduct(id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ error });
    }
};
