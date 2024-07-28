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
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const createProduct = (name, description, price, stock_quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.default({ name, description, price, stock_quantity });
    yield product.save();
    return product;
});
exports.createProduct = createProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.find();
});
exports.getAllProducts = getAllProducts;
const updateProduct = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findByIdAndUpdate(id, updates, { new: true });
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findByIdAndDelete(id);
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productService.js.map