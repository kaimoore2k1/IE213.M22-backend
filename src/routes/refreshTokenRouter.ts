import express from 'express'
import jwt, { JwtPayload, Secret, verify } from "jsonwebtoken";
import Accounts from "../model/Accounts";
import { createAccessToken, sendRefreshToken } from '../utils/auth';

const router = express.Router();

router.get('/', async (req, res) =>{

    //Lấy refresh token
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

    //Người dùng chưa đăng nhập
    if(!refreshToken) return res.status(401)

    try{
        const decodedUser = verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as Secret
		) as any 
            
		const user = await Accounts.findOne({username: decodedUser.username})

        if(!user || user.tokenVersion !== decodedUser.tokenVersion){
            return res.sendStatus(401)
        }

        sendRefreshToken(res, user)

        return res.json({ 
            success: true,
            accessToken: createAccessToken('accessToken', user)
        })
        
    }catch (error) {
		console.log('ERROR REFRESHING TOKEN', error)
		return res.sendStatus(403)
	}


   
})

export default router;