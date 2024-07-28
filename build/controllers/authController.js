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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const logger_1 = __importDefault(require("../logger/logger"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const user = yield (0, authService_1.registerUser)(name, email, password, role);
        logger_1.default.info(`User Registered Successfully - ${email}`);
        res.status(201).json({ message: `User registered successfully`, user });
    }
    catch (error) {
        logger_1.default.error(`User Registration Error: ${error}`);
        res.status(400).json({ error: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, authService_1.loginUser)(email, password);
        res.status(200).json({ token, message: `User logged in successfully !` });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map