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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
const logger_1 = __importDefault(require("./logger/logger"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
}));
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV || "*",
}));
app.use('/', authRoutes_1.default);
app.use('/', productRoutes_1.default);
// Basic Route
app.get("/", (req, res) => {
    res.send("E-Commerce Platform with Advanced Features");
});
// Start the server :
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        logger_1.default.info(`Connected to the DB ! and Server is running on PORT ${PORT}`);
    }
    catch (error) {
        console.error(error);
    }
}));
//# sourceMappingURL=index.js.map