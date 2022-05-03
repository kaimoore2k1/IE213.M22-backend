"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken)
            throw new apollo_server_express_1.AuthenticationError("Not authenticated");
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
        return decoded;
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(JSON.stringify(err));
    }
};
exports.checkAuth = checkAuth;
