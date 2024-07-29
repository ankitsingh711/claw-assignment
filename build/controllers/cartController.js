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
exports.getCart = exports.addToCart = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const logger_1 = __importDefault(require("../logger/logger"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    console.log("productId -->", productId);
    console.log("quantity -->", quantity);
    try {
        const product = yield productModel_1.default.findById(productId);
        console.log("product found --->", product);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
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
                cart = [];
            }
        }
        const existingProductIndex = cart.findIndex((item) => item.productId === productId);
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += quantity;
        }
        else {
            cart.push({ productId, quantity });
        }
        res.cookie("cart", JSON.stringify(cart), {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }); // 30 days
        res.status(200).json(cart);
    }
    catch (error) {
        logger_1.default.error(`Server Error - while adding product to the cart: ${error}`);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                cart = [];
            }
        }
        if (cart.length === 0) {
            return res.status(200).json([]);
        }
        const productIds = cart.map((item) => item.productId);
        const products = yield productModel_1.default.find({ _id: { $in: productIds } });
        const detailedCart = cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return Object.assign(Object.assign({}, item), { product });
        });
        res.status(200).json(detailedCart);
    }
    catch (error) {
        console.error("Server Error - while retrieving cart:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getCart = getCart;
//# sourceMappingURL=cartController.js.map