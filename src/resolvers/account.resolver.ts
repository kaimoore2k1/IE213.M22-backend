import Accounts from "../model/Accounts";
import "reflect-metadata";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {NextFunction} from 'express'
import {createAccessToken, sendRefreshToken} from "../utils/auth"
import { checkAuth } from '../middleware/checkAuth'
import jwt, { Secret } from "jsonwebtoken";

dotenv.config();
const { ObjectId } = mongoose.Types;
const next:NextFunction = () => {}


export const accountResolvers = {
    Query: {
        async accounts(root:any, _:any, context:any) {
            const users = await Accounts.find({});
            return users
        },
        async me(_:any, {}: any, context:any){
            checkAuth(context.req, context.res, next)
            const decodeUser =  jwt.verify(context.accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as any
            if(!decodeUser){
                return context.res.status(401)
            }
            const user = await Accounts.findOne({username: decodeUser.username})
            return {
                status: 200,
                success: true,
                message: 'successfully',
                data: user
            }
        }
    },
    Mutation: {
        async logout(_:any, {username}: any, context: any){
            const user = await Accounts.findOne({username})
            if(!user){
                return{
                    status: 400,
                    success: false,
                }
                
            } 
            user.tokenVersion += 1;
            await user.save();
            context.res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string,{ 
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/refresh_token'
            });   
            return{
                status: 200,
                success: true
            }
        },
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
            sendRefreshToken(context.res, user)
            if (user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const accessToken = createAccessToken('accessToken',user)
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