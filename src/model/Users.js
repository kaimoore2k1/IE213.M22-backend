"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    individualData: {
        firstName: {
            type: String,
            required: true
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
        }
    },
    dateCreate: {
        type: Date,
        required: true
    },
    productsBooked: [
        {
            ID_Product: ObjectId
        }
    ],
    avatarUrl: String
});
exports.default = mongoose_1.default.model('users', userSchema);
