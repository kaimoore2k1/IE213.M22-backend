import { NextFunction, Request, Response } from "express";
import Accounts  from "../model/Accounts";
import bcrypt from "bcrypt";
import { createAccessToken, sendRefreshToken } from "./auth";

export const facebookAuth = async (req: any, res: any, context:any) => {
    console.log('facebook: ', req.user);
    const {
        id,
        displayName,
        provider,
      } = req.user;
    //find user in database
    try{
        const user = await Accounts.findOne({providerId: id})
        
        if(!user){
            //Không tìm thấy user => Tạo mới user trong database
            // const password = `facebook_${id}`
            // const hashPassword = bcrypt.hashSync(password, 10)
            const newUser = await Accounts.create({
                providerId: id,
                username: displayName,
                provider: provider,
                email: `${id}@gmail.com`,
                password: `facebook_${id}`
            })
            const accessToken = createAccessToken('accessToken',newUser)
            // sendRefreshToken(context.res, newUser);  
            console.log('access token facebook: ', accessToken)
            context.token = accessToken
            console.log('context token: ', context.token)
            res.cookie(
                'senshop', 
                accessToken
            )
            // sendRefreshToken(context.res, newUser);
        }else{
        
            const accessToken = createAccessToken('accessToken',user)
            // sendRefreshToken(context.res, user);  
            // console.log('refreshToken: ', sendRefreshToken(context.res, user))
            context.token = accessToken
            console.log('access token facebook: ', accessToken)
            console.log('context token: ', context.token)
            res.cookie(
                'senshop', 
                accessToken
            )
            // sendRefreshToken(context.res, user);
        }
        res.redirect('http://localhost:3000/');

    }catch(err){
        res.redirect('http://localhost:3000/login');
    }       

    // Successful authentication, redirect home.
	
}