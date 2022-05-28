import Users from "../model/Users";
import Accounts from "../model/Accounts";
import "reflect-metadata";
import bcrypt from "bcrypt";
import { use } from "passport";
import { GraphQLError } from "graphql";

const date = new Date();

export const userResolvers = {
    Query: {
        async getAllUsers(_: any, arg: any, context: any) {
            const data = await Users.find();
            return data;
        },
        async getUserByUsername(_:any, {username}: any, context: any){
            if(typeof(username) === 'string'){
                const data = await Users.findOne({username: username});
                return data;
            }
            
        }
    },
    Mutation: {
        async deleteUser(_: any, { username }: any, context: any) {
            await Accounts.findOneAndRemove({ username})
            return await Users.findOneAndRemove({ username})
        },
        async createOrUpdateUser(_: any, { username, data }: any, context: any) {
            const initialUser = await Accounts.find({ username })
            const hashPassword = bcrypt.hashSync(data.password, 10)
            
            if (initialUser[0]) {
                // await Accounts.findOneAndUpdate({ username }, {
                //     email: data.email
                // })
                if(bcrypt.compareSync(data.password, initialUser[0].password)){
                    const user =  await Users.findOneAndUpdate({ username }, {
                    
                        firstName: data.firstName,  
                        lastName: data.lastName,
                        country: data.country,
                        address: data.address,
                        city: data.city,
                        numberPhone: data.numberPhone,
                        email: data.email,
    
                    })

                    return user;
                } 
                else{
                    return GraphQLError;
                }
            }
            else {
                await Accounts.create({
                    username: data.username,
                    password: hashPassword,
                    email: data.email
                })
                await Users.create({
                    username: username,

                    firstName: data.firstName,
                    lastName: data.lastName,
                    country: data.country,
                    address: data.address,
                    city: data.city,
                    numberPhone: data.numberPhone,
                    email: data.email,

                    dateCreate: date.toDateString(),
                    avatarUrl: "https://senshop.tech/static/media/logo.bc588d992055212e8997a878ac242940.svg"
                })
            }
        }
    }
}