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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAll = exports.create = void 0;
const productService_1 = require("../services/productService");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock_quantity } = req.body;
    try {
        const product = yield (0, productService_1.createProduct)(name, description, price, stock_quantity);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productService_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getAll = getAll;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    console.log('this is id and updates', id, updates);
    try {
        const product = yield (0, productService_1.updateProduct)(id, updates);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, productService_1.deleteProduct)(id);
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.remove = remove;
//# sourceMappingURL=productController.js.map