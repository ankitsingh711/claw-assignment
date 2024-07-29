"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.placeOrder = void 0;
const ordersModel_1 = require("../models/ordersModel");
const productModel_1 = __importDefault(require("../models/productModel"));
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = [];
        if (req.cookies.cart) {
            try {
                cart = JSON.parse(req.cookies.cart);
                if (!Array.isArray(cart)) {
                    cart = [];
                }
            }
            catch (error) {
                console.error("Error parsing cart JSON:", error);
                return res.status(400).json({ error: "Invalid cart data" });
            }
        }
        if (cart.length === 0)
            return res.status(400).json({ error: "Cart is empty" });
        const populatedCart = yield Promise.all(cart.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield productModel_1.default.findById(item.productId);
            if (!product) {
                return null;
            }
            return { product, quantity: item.quantity };
        })));
        // Filter out any invalid products
        const validCart = populatedCart.filter((item) => item !== null);
        if (validCart.length === 0)
            return res.status(400).json({ error: "No valid products in cart" });
        const totalAmount = validCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { userId } = req.user;
        const newOrder = new ordersModel_1.Order({
            user: userId,
            products: validCart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            total: totalAmount,
        });
        yield newOrder.save();
        res.clearCookie("cart");
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error(`Server Error - while placing order: ${error}`);
        res.status(500).json({ error: "Server error" });
    }
});
exports.placeOrder = placeOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { userId } = req.user;
        const orders = yield ordersModel_1.Order.find({ user: userId }).populate('products.product');
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(`Server Error - while retrieving orders: ${error}`);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getOrders = getOrders;
//# sourceMappingURL=orderController.js.map