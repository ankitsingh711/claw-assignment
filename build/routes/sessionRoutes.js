"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authorization);
router.get("/sessions", sessionController_1.getSessions);
exports.default = router;
//# sourceMappingURL=sessionRoutes.js.map