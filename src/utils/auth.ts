import { Secret, sign } from "jsonwebtoken"
import dotenv from "dotenv";
import { Response } from "express";
import Accounts from "../model/Accounts";

dotenv.config();
export const createAccessToken = (type: 'accessToken' | 'refreshToken', user: any) => 
sign (
    {
        username : user.username,
        ...(type === 'refreshToken' ? {tokenVersion: user.tokenVersion} : {})
    },
    type === 'accessToken'?
    process.env.ACCESS_TOKEN_SECRET as Secret:process.env.REFRESH_TOKEN_SECRET as Secret,
    {
        expiresIn: type === 'accessToken' ? '15s' : '1h'
    }
)
export const sendRefreshToken = (res: Response, user: typeof Accounts) => {
	res.cookie(
        process.env.REFRESH_TOKEN_COOKIE_NAME as string, 
        createAccessToken('refreshToken', user), 
        { 
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/refresh_token'
        }
    )
}