"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createAccessToken = (user) => (0, jsonwebtoken_1.sign)({
    username: user.username
}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
});
exports.createAccessToken = createAccessToken;
