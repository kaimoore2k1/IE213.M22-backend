import { NextFunction, Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-express'
import Accounts from '../model/Accounts'
import Admins from '../model/Admins'
import jwt, { Secret } from "jsonwebtoken";

//Kiểm tra có user nào đăng nhập hay không
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
      try {
            const authHeader = req.headers.authorization || '';
            const accessToken = authHeader && authHeader.split(' ')[1]
            if (!accessToken) throw new AuthenticationError("Not authenticated")
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret)
            next()
            return decoded    
      }
      catch (err) {
            throw new AuthenticationError(JSON.stringify(err))
      }
}

//Kiểm tra tk đăng nhập là user
export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
      try{
            const authHeader = req.headers.authorization || '';
            const accessToken = authHeader && authHeader.split(' ')[1]
            if (!accessToken) throw new AuthenticationError("Not authenticated")
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as any
            const user = await Accounts.findOne({username : decoded.username});
            console.log(user)
            console.log(decoded)
            if(!user) {
                  throw new AuthenticationError("Not permission")
            }
            else {
                  next()  
            }     
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
            if (!accessToken) throw new AuthenticationError("Not authenticated")
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as any
            const user = await Admins.findOne({username : decoded.username});
            if(!user) throw new AuthenticationError("Not permission")
            return next()   
      }
      catch(err){
            throw new AuthenticationError(JSON.stringify(err))
      }
}