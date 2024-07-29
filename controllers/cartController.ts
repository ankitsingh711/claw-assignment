import { Request, Response } from "express";
import Product from "../models/productModel";
import logger from "../logger/logger";

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  console.log("productId -->", productId);
  console.log("quantity -->", quantity);

  try {
    const product = await Product.findById(productId);
    console.log("product found --->", product);

    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart: any[] = [];

    if (req.cookies.cart) {
      try {
        cart = JSON.parse(req.cookies.cart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error("Error parsing cart JSON:", error);
        cart = [];
      }
    }

    const existingProductIndex = cart.findIndex(
      (item: any) => item.productId === productId
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    res.cookie("cart", JSON.stringify(cart), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }); // 30 days
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Server Error - while adding product to the cart: ${error}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    let cart: any[] = [];

    if (req.cookies.cart) {
      try {
        cart = JSON.parse(req.cookies.cart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error("Error parsing cart JSON:", error);
        cart = [];
      }
    }

    if (cart.length === 0) {
      return res.status(200).json([]);
    }

    const productIds = cart.map((item: any) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const detailedCart = cart.map((item: any) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, product };
    });

    res.status(200).json(detailedCart);
  } catch (error) {
    console.error("Server Error - while retrieving cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};
