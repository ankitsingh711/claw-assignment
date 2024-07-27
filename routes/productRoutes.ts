import express from 'express';
import { getAllProducts, addProduct, updateProductById, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.post('/products', addProduct);

router.get('/products', getAllProducts);

router.put('/products/:id', updateProductById);

router.delete('/products/:id', deleteProduct);

export default router;