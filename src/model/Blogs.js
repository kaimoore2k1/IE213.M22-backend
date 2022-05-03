"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const blogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    like: [
        {
            ID_USER: ObjectId
        }
    ],
    images: [
        {
            url: {
                type: String,
                required: true
            },
            title: String
        }
    ],
    share: {
        type: Number,
        required: true
    },
    author: [
        {
            ID_USER: ObjectId
        }
    ],
    categories: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('blogs', blogSchema);
