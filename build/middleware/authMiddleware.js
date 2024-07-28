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
exports.roleBasedAccess = exports.authorization = void 0;
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
        jsonwebtoken_1.default.verify(token, "your_jwt_secret", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                logger_1.default.error(`Invalid Token: ${err.message}`);
                return res.status(401).json({ message: "Invalid token" });
            }
            else {
                logger_1.default.info("Token verified successfully");
                req.user = decoded;
                next();
            }
        }));
    }
    catch (error) {
        logger_1.default.error(`Authorization Error: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.authorization = authorization;
const roleBasedAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        if (!user) {
            logger_1.default.error("Unauthorized access - User not found");
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        let role;
        if (typeof user === 'string') {
            const decoded = jsonwebtoken_1.default.decode(user);
            role = decoded === null || decoded === void 0 ? void 0 : decoded.role;
        }
        else if ('role' in user) {
            role = user.role;
        }
        else if (typeof user === 'object') {
            role = user.role;
        }
        if (role && role === "admin") {
            next();
        }
        else {
            logger_1.default.error("Unauthorized access - Forbidden");
            res
                .status(403)
                .json({ message: "Forbidden: Unauthorized access - admin protected" });
        }
    }
    catch (error) {
        logger_1.default.error(`Error during role-based access check: ${error}`);
        return res
            .status(500)
            .json({ message: "Internal Server Error: Please try again later" });
    }
});
exports.roleBasedAccess = roleBasedAccess;
//# sourceMappingURL=authMiddleware.js.map