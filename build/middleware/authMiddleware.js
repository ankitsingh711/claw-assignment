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
exports.verifyAdmin = exports.authorization = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const logger_1 = __importDefault(require("../logger/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }
        jsonwebtoken_1.default.verify(token, "your_jwt_secret", (err, decoded) => {
            if (err) {
                logger_1.default.error(`Invalid Token: ${err.message}`);
                return res.status(401).json({ message: "Invalid token" });
            }
            else {
                logger_1.default.info("Token verified successfully");
                next();
            }
        });
    }
    catch (error) {
        logger_1.default.error(`Authorization Error: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.authorization = authorization;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req;
    const user = yield userModel_1.default.findById(userId);
    if (user && user.role === "admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Forbidden" });
    }
});
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=authMiddleware.js.map