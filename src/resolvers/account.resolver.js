"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountResolvers = void 0;
const Accounts_1 = __importDefault(require("../model/Accounts"));
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../utils/auth");
const checkAuth_1 = require("../middleware/checkAuth");
dotenv_1.default.config();
const { ObjectId } = mongoose_1.default.Types;
const next = () => { };
exports.accountResolvers = {
    Query: {
        async accounts(root, _, context) {
            (0, checkAuth_1.checkAuth)(context.req, context.res, next);
            if (!context.accessToken)
                return null;
            const users = await Accounts_1.default.find({});
            return users;
        }
    },
    Mutation: {
        async register(_, { username, password, email }) {
            const user = await Accounts_1.default.findOne({ username });
            if (!user) {
                const hashPassword = bcrypt_1.default.hashSync(password, 10);
                //const check = bcrypt.compareSync(password, hasPassword)
                const createUser = await Accounts_1.default.create({ username, password: hashPassword, email });
                return {
                    status: 200,
                    success: true,
                    message: 'User created successfully',
                    data: createUser
                };
            }
            else {
                return {
                    status: 401,
                    success: false,
                    message: 'Email duplicated'
                };
            }
        },
        async login(_, { username, password }, context) {
            const user = await Accounts_1.default.findOne({ username });
            if (user) {
                if (bcrypt_1.default.compareSync(password, user.password)) {
                    const accessToken = (0, auth_1.createAccessToken)(user);
                    context.token = accessToken;
                    return {
                        status: 200,
                        success: true,
                        message: 'Login successfully',
                        data: user,
                        accessToken
                    };
                }
                else {
                    return {
                        status: 401,
                        success: false,
                        message: 'wrong password'
                    };
                }
            }
            else {
                return {
                    status: 401,
                    success: false,
                    message: 'username is not exited'
                };
            }
        },
        async updateAccount(_, { username, newUsername, newPassword, newEmail }, context) {
            (0, checkAuth_1.checkAuth)(context.req, context.res, next);
            const user = await Accounts_1.default.findOne({ username: username });
            if (!user)
                throw new Error(`User ${username} not found`);
            const updateUser = await Accounts_1.default.findOneAndUpdate({ username: username }, {
                username: newUsername,
                password: newPassword,
                email: newEmail
            });
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: updateUser
            };
        },
        async deleteAccount(_, { username }, context) {
            (0, checkAuth_1.checkAuth)(context.req, context.res, next);
            const user = await Accounts_1.default.findOne({ username });
            if (!user)
                throw new Error(`User ${username} not found`);
            await Accounts_1.default.findOneAndDelete({ username: username });
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: username
            };
        }
    }
};
