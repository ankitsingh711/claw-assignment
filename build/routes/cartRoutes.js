"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authorization);
router.post('/cart', cartController_1.addToCart);
router.get('/cart', cartController_1.getCart);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map