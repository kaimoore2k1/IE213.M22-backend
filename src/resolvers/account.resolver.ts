import Accounts from "../model/Accounts";
import "reflect-metadata";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {NextFunction} from 'express'
import {createAccessToken} from "../utils/auth"
import { checkAuth } from '../middleware/checkAuth'

dotenv.config();
const { ObjectId } = mongoose.Types;
const next:NextFunction = () => {}


export const accountResolvers = {
    Query: {
        async accounts(root:any, _:any, context:any) {
            checkAuth(context.req, context.res, next)
            if(!context.accessToken) return null
            const users = await Accounts.find({});
            return users
        }
    },
    Mutation: {
        async register(_: any, { username, password, email }: any) {
            const user = await Accounts.findOne({ username })
            if (!user) {
                const hashPassword = bcrypt.hashSync(password, 10)
                //const check = bcrypt.compareSync(password, hasPassword)
                const createUser = await Accounts.create({ username, password: hashPassword, email})
                return {
                    status: 200,
                    success: true,
                    message: 'User created successfully',
                    data: createUser
                }
            }
            else {
                return {
                    status: 401,
                    success: false,
                    message: 'Email duplicated'
                }
            }
        },
        async login(_: any, { username, password }: any, context: any): Promise<any> {
            const user = await Accounts.findOne({ username })
            if (user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const accessToken = createAccessToken(user)
                    context.token = accessToken
                    return { 
                        status: 200,
                        success: true,
                        message: 'Login successfully',
                        data: user,
                        accessToken
                    }
                }
                else {
                    return {
                        status: 401,
                        success: false,
                        message: 'wrong password'
                    }
                }
            }
            else {
                return {
                    status: 401,
                    success: false,
                    message: 'username is not exited'
                }
            }
        },
        async updateAccount(_: any, { username, newUsername, newPassword, newEmail }: any, context: any) {
            checkAuth(context.req, context.res, next)
            const user = await Accounts.findOne({ username: username })
            if (!user) throw new Error(`User ${username} not found`)
            const updateUser = await Accounts.findOneAndUpdate({ username: username }, {
                username: newUsername,
                password: newPassword,
                email: newEmail
            })
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: updateUser
            }
        },
        async deleteAccount(_: any, { username }: any, context: any){
            checkAuth(context.req, context.res, next)
            const user = await Accounts.findOne({ username })
            if (!user) throw new Error(`User ${username} not found`)
            await Accounts.findOneAndDelete({ username: username })
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: username
            }
        }
    }
};