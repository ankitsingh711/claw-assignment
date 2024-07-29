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
exports.processPayment = void 0;
const stripe_1 = __importDefault(require("../config/stripe"));
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const processPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, paymentMethodId } = req.body;
    try {
        const order = yield ordersModel_1.default.findById(orderId).populate('products.product');
        if (!order)
            return res.status(404).json({ error: 'Order not found' });
        const paymentIntent = yield stripe_1.default.paymentIntents.create({
            amount: order.totalAmount * 100, // amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });
        order.status = 'completed';
        yield order.save();
        res.status(200).json({ success: true, paymentIntent });
    }
    catch (error) {
        res.status(500).json({ error: 'Payment processing failed' });
    }
});
exports.processPayment = processPayment;
//# sourceMappingURL=paymentController.js.map