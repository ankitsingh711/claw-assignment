"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/payment', authMiddleware_1.authorization, paymentController_1.processPayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map