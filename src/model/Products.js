"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    salePrice: Number,
    categories: {
        type: [String],
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            title: String
        }
    ],
    variant: {
        size: [String],
        color: [String]
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('products', productSchema);
