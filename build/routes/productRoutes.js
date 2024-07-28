"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authorization);
router.use(authMiddleware_1.roleBasedAccess);
router.post('/products', productController_1.create);
router.get('/products', productController_1.getAll);
router.put('/products/:id', productController_1.update);
router.delete('/products/:id', productController_1.remove);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map