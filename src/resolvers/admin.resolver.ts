import Admins from '../model/Admins'
import bcrypt from "bcrypt";
import {createAccessToken, sendRefreshToken, sendRefreshTokenAdmin} from "../utils/auth"
import { checkAuth } from '../middleware/checkAuth';
import { NextFunction } from 'express';

export const adminResolvers = {
    Query: {
        async getAdminByName(_:any, {username} : any, context: any, next: NextFunction){
            // checkAuth(context.req, context.res, next)
            const admin = await Admins.findOne({username});
            console.log(admin)
            if(admin){
                return{
                    status: 200,
                    success: true,
                    username: admin.username
                }
            }
        }
    },
    Mutation: {
        async adminLogin(_: any, { username, password }: any, context: any) {
            const user = await Admins.findOne({ username }) ?? false;
            sendRefreshTokenAdmin(context.res, user);      
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
            
            // if (user) {
            //     if(password === user.password) {
            //         const accessToken = createAccessToken('accessToken', user)
            //         context.token = accessToken
            //         return { 
            //             status: 200,
            //             success: true,
            //             message: 'Login successfully',
            //             data: user,
            //             accessToken
            //         }
            //     }
            //     else {
            //         return {
            //             status: 401,
            //             success: false,
            //             message: 'wrong password'
            //         }
            //     }
            // }
            // else {
            //     return {
            //         status: 401,
            //         success: false,
            //         message: 'username is not exited'
            //     }
            // }
        },
        async adminRegister(_:any, {username, password}: any){
            const admin = await Admins.findOne({username}) ?? false;
            if(admin){
                return {
                    status: 401,
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại'
                }
            }
            else{
                const hashPassword = bcrypt.hashSync(password, 10);
                const createAdmin = await Admins.create({ username, password: hashPassword})
                return {
                    status: 200,
                    success: true,
                    message: 'Đăng ký người dùng thành công',
                    data: createAdmin
                }
            }

        },
    }
}