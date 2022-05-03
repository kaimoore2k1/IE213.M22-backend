import Admins from '../model/Admins'
import {createAccessToken} from "../utils/auth"

export const adminResolvers = {
    Mutation: {
        async login(_: any, { username, password }: any, context: any) {
            const user = await Admins.findOne({ username })
            if (user) {
                if(password === user.password) {
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
        }
    }
}