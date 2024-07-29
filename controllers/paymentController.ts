import { Request, Response } from "express";
import stripe from "../config/stripe";
import { Order } from "../models/ordersModel";

export const processPayment = async (req: Request, res: Response) => {
  const { orderId, paymentMethodId } = req.body;

  try {
    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ error: "Order not found" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.total * 100,
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
    });

    order.status = "completed";
    await order.save();

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ error: "Payment processing failed" });
  }
};
