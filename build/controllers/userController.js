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
exports.retrieveSession = exports.userRegister = exports.userLogIn = void 0;
const logger_1 = __importDefault(require("../logger/logger"));
const supabase_1 = require("../config/supabase");
const userModel_1 = __importDefault(require("../models/userModel"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const { data, error } = yield supabase_1.supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const user = data.user;
        if (!user) {
            return res.status(400).json({ error: "User registration failed" });
        }
        const newUser = new userModel_1.default({ name, email, supabaseId: user.id, role });
        yield newUser.save();
        res
            .status(200)
            .json({ message: `User registered successfully: ${user.email}` });
    }
    catch (error) {
        console.error(error);
        logger_1.default.error("User registration failed");
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.userRegister = userRegister;
const userLogIn = () => {
    try {
        // Your login logic here
    }
    catch (error) {
        console.error(error);
        logger_1.default.error("User Login failed!");
    }
};
exports.userLogIn = userLogIn;
const retrieveSession = () => {
    // Your session retrieval logic here
};
exports.retrieveSession = retrieveSession;
//# sourceMappingURL=userController.js.map