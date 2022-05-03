"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResolvers = void 0;
const Products_1 = __importDefault(require("../model/Products"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.productResolvers = {
    Query: {
        async getAllProductsByCategory(_, { categories }, context) {
            const products = await Products_1.default.find({ categories });
            return products;
        },
        async getProductByName(_, { name }, context) {
            const product = await Products_1.default.findOne({ name });
            return product;
        }
    }
};
