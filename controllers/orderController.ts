import { Request, Response } from "express";
import { Order, IOrder } from "../models/ordersModel";
import Product from "../models/productModel";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}

export const placeOrder = async (req: CustomRequest, res: Response) => {
  try {
    let cart: CartItem[] = [];

    if (req.cookies.cart) {
      try {
        cart = JSON.parse(req.cookies.cart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error("Error parsing cart JSON:", error);
        return res.status(400).json({ error: "Invalid cart data" });
      }
    }

    if (cart.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const populatedCart = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          return null; 
        }
        return { product, quantity: item.quantity };
      })
    );

    // Filter out any invalid products
    const validCart = populatedCart.filter((item) => item !== null);

    if (validCart.length === 0)
      return res.status(400).json({ error: "No valid products in cart" });

    const totalAmount = validCart.reduce(
      (acc, item) => acc + item!.product.price * item!.quantity,
      0
    );

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { userId } = req.user;

    const newOrder: IOrder = new Order({
      user: userId,
      products: validCart.map((item) => ({
        product: item!.product._id,
        quantity: item!.quantity,
      })),
      total: totalAmount,
    });
    await newOrder.save();

    res.clearCookie("cart");
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(`Server Error - while placing order: ${error}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const getOrders = async (req: CustomRequest, res: Response) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      const { userId } = req.user;
  
      const orders = await Order.find({ user: userId }).populate('products.product');
      res.status(200).json(orders);
    } catch (error) {
      console.error(`Server Error - while retrieving orders: ${error}`);
      res.status(500).json({ error: 'Server error' });
    }
  };
