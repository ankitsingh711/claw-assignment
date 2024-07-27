"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
}));
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV,
}));
app.get("/", (req, res) => {
    res.send("E-Commerce Platform with Advanced Features");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map