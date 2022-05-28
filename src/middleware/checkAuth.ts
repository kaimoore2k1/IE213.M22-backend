import { NextFunction, Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-express'
import Accounts from '../model/Accounts'
import Admins from '../model/Admins'
import jwt, { Secret } from "jsonwebtoken";

//Kiểm tra có user nào đăng nhập hay không
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
      try {
            const authHeader = req.header('Authorization')
		const accessToken = authHeader && authHeader.split(' ')[1]

		if (!accessToken)
			throw new AuthenticationError(
				'Not authenticated to perform GraphQL operations'
			)

		const decodedUser = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET as Secret
		) as any

		return next()
      }
      catch (err) {
            console.log('error')
            throw new AuthenticationError(JSON.stringify(err))
      }
}

//Kiểm tra tk đăng nhập là user
export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization || '';
      const accessToken = authHeader && authHeader.split(' ')[1]
      // if (!accessToken) throw new AuthenticationError("Not authenticated")
      try{
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as any
            const user = await Accounts.findOne({username : decoded.username}) ?? false;
            console.log(user)
            console.log(decoded)
            if(user) {
                  req.user = user;
            }else{
                  throw new AuthenticationError("Not authenticated")
            }
            return next()       
      }
      catch(err){
            throw new AuthenticationError(JSON.stringify(err))
      }
}

//Kiểm tra tk đăng nhập là admin
export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
      try{
            const authHeader = req.headers.authorization || '';
            const accessToken = authHeader && authHeader.split(' ')[1]
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as any
            const user = await Admins.findOne({username : decoded.username}) ?? false;
            if(user){
                  req.user = user;
                  next()
            }else{
                  return res.status(500);
            }
            
      }
      catch(err){
            throw new AuthenticationError(JSON.stringify(err))
      }
}