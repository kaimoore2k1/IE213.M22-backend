import { Secret, sign } from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();
export const createAccessToken = (user: any) => sign (
    {
        username : user.username
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
        expiresIn: '1h'
    }
)