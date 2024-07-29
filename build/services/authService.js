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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const sendMail_1 = require("../services/sendMail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const logger_1 = __importDefault(require("../logger/logger"));
dotenv_1.default.config();
const registerUser = (name, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    // const { data, error } = await supabase.auth.signUp({ email, password });
    // if (error) throw error;
    const existingUser = yield userModel_1.UserModel.findOne({ email });
    if (existingUser) {
        logger_1.default.info(`User registration failed : User already exist - ${email}`);
        return email;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new userModel_1.UserModel({ name, email, password: hashedPassword, role });
    yield user.save();
    (0, sendMail_1.sendMail)([email]);
    return;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) throw error;
    const user = yield userModel_1.UserModel.findOne({ email });
    if (!user) {
        logger_1.default.info(`User Login Failed: Invalid Credentials - ${email}`);
        return { message: "Invalid credentials" };
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        logger_1.default.info(`User Login Failed: Invalid Credentials - ${email}`);
        return { message: "Invalid credentials" };
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, "your_jwt_secret", {
        expiresIn: "1h",
    });
    logger_1.default.info(`User logged in successfully - ${email}`);
    return {
        token,
        user: { id: user._id, email: user.email }
    };
});
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map