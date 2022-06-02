import Accounts from "../model/Accounts";
import Users from "../model/Users";
import "reflect-metadata";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {NextFunction} from 'express'
import {createAccessToken, sendRefreshToken} from "../utils/auth"
import { checkAdmin, checkAuth, checkUser } from '../middleware/checkAuth'
import jwt, { Secret } from "jsonwebtoken";
import Admins from '../model/Admins'
import { AuthenticationError } from "apollo-server-express";
import passport from "passport";

dotenv.config();
const { ObjectId } = mongoose.Types;
const next:NextFunction = () => {}
const date = new Date();

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
            const user = await Accounts.findOne({username: decodeUser.username}) ?? false;
            if(user){

                return {
                    status: 200,
                    success: true,
                    message: 'successfully',
                    data: user,
                    password: user.password
                }
            }
        },
        async getAccountByName(_: any, { username}: any) {
            const users = await Accounts.findOne({username});
            return users
        }
    },
    Mutation: {
        async logout(_:any, {username}: any, context: any){
            const user = await Accounts.findOne({username}) ?? false;
            if(user){
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
                
            } 
            else{
                const admin = await Admins.findOne({username})?? false;
                if(admin){
                    admin.tokenVersion += 1;
                    await admin.save();
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
                }
            }
            
        },
        async register(_: any, { username, password, email }: any) {
            const user = await Accounts.findOne({ username }) ?? false
            if (!user) {
                const hashPassword = bcrypt.hashSync(password, 10)
                //const check = bcrypt.compareSync(password, hasPassword)
                const createUser = await Accounts.create({ username, password: hashPassword, email})
                await Users.create({
                    username: username,
                    password: password,
                    individualData: {
                        email: email,
                    },
                    dateCreate: date.toDateString(),
                    avatarUrl: "https://senshop.tech/static/media/logo.bc588d992055212e8997a878ac242940.svg"
                })
                return {
                    status: 200,
                    success: true,
                    message: 'Đăng ký người dùng thành công',
                    data: createUser
                }
            }
            else {
                return {
                    status: 401,
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại'
                }
            }
        },
        async login(_: any, { username, password }: any, context: any): Promise<any> {
            const user = await Accounts.findOne({ username }) ?? false;
            sendRefreshToken(context.res, user);      
            if(!user ){
                return {
                    status: 401,
                    success: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng' 
                }
            }
            const decodePassword = bcrypt.compareSync(password, user.password);
            if (!decodePassword) {
                return {
                    status: 401,
                    success: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
                }
            }
            const accessToken = createAccessToken('accessToken',user)
                context.token = accessToken
                return { 
                    status: 200,
                    success: true,
                    message: 'Đăng nhập thành công',
                    accessToken
                }
            
            
        },
        async updateAccount(_: any, { username, newUsername, newPassword, newEmail }: any, context: any) {
            checkAuth(context.req, context.res, next)
            
            const user = await Accounts.findOne({ username: username }) ?? false
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
        async updateAccountInfo(_: any, { username,  data }: any, context: any){
            console.log("Update account")
            const hashPassword = bcrypt.hashSync(data.password, 10)
            const updateAccount = await Accounts.findOneAndUpdate({username: username},{
               
                //password: hashPassword,
                email: data.email 
            })
         
            return updateAccount;
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
        },

        async deleteAccountFromFrontend(_: any, { username, password }: any, context: any){
            console.log("Delete Account")
            checkAuth(context.req, context.res, next)
            
            const user = await Accounts.findOne({ username })
            if (!user) throw new Error(`User ${username} not found`)
            try {
                console.log(user.password)
                
            } catch (error) {
                
            }
            
            if(bcrypt.compareSync(password, user.password)){
                
                await Accounts.findOneAndDelete({ username: username })
                return {
                    status: 200,
                    success: true,
                    message: 'Successfully',
                    data: username
                }

            }
            else throw new Error("Password is not true");
        },

        
        async changePassword(_: any, { username, password, newPassword}: any, context: any){
            const user = await Accounts.findOne({ username });
            if(user){
                const checkPassword = bcrypt.compareSync(password, user.password);
                if(checkPassword){
                    const hashPassword = bcrypt.hashSync(newPassword, 10)
                    const user = await Accounts.findOneAndUpdate({username: username},{
                        password: hashPassword
                    })
                    return{
                        status: 200,
                        success: true,
                        message: 'Thay đổi mật khẩu thành công',
                        data: user
                    }
                    
                }else{
                    return{
                        status: 406,
                        success: false,
                        message: 'Mật khẩu không chính xác',
                    }
                }
            }else{
                return{
                    status: 406,
                    success: false,
                    message: 'Không tìm thấy user',
                }
            }
        }
    }
};