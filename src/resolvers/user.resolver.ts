import Users from "../model/Users";
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


export const userResolvers = {
    Query: {
        async user(_: any, { _id }: any, context: any) {
            checkAuth(context.req, context.res, next)
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: await Users.findOne({ _id: new ObjectId(_id) })
            }
        },
        async users(root:any, _:any, context:any) {
            checkAuth(context.req, context.res, next)
            if(!context.accessToken) return null
            const users = await Users.find({});
            return users
        },
        async me(root:any, _:any, context:any) {
            const decodedMe:any= checkAuth(context.req, context.res, next)
            const getMe = await Users.findOne({username:decodedMe.username})
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: getMe
            }
        }
    },
    Mutation: {
        async createUser(_: any, { username, password, email }: any) {
            const user = await Users.findOne({ username })
            if (!user) {
                const hashPassword = bcrypt.hashSync(password, 10)
                //const check = bcrypt.compareSync(password, hasPassword)
                const createUser = await Users.create({ username, password: hashPassword, email })
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
            const user = await Users.findOne({ username })
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
        async updateUser(_: any, { username, newUsername, newPassword, newEmail }: any, context: any) {
            checkAuth(context.req, context.res, next)
            const user = await Users.findOne({ username: username })
            if (!user) throw new Error(`User ${username} not found`)
            const updateUser = await Users.findOneAndUpdate({ username: username }, {
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
        async deleteUser(_: any, { username }: any, context: any){
            checkAuth(context.req, context.res, next)
            const user = await Users.findOne({ username })
            if (!user) throw new Error(`User ${username} not found`)
            await Users.findOneAndDelete({ username: username })
            return {
                status: 200,
                success: true,
                message: 'Successfully',
                data: username
            }
        }
    }
};