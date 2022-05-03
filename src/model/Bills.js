"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const billSchema = new mongoose_1.default.Schema({
    ID_USER: {
        type: ObjectId,
        required: true
    },
    products: {
        required: true,
        type: [
            {
                ID_PRODUCT: {
                    required: true,
                    type: ObjectId
                }
            }
        ]
    },
    paymentInfor: {
        firstName: {
            required: true,
            type: String
        },
        lastName: {
            type: String,
            required: true
        },
        country: String,
        address: String,
        city: String,
        numberPhone: String,
        email: {
            type: String,
            required: true
        },
        code: String,
        paymentMethod: {
            required: true,
            type: String
        },
        note: String,
        voucher: String
    },
    total: {
        required: true,
        type: Number
    },
    amount: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    }
});
exports.default = mongoose_1.default.model('comments', billSchema);
