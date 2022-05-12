import { NextFunction, Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-express'
import jwt, { Secret } from "jsonwebtoken";

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