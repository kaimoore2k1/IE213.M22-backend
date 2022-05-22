import Users from "../model/Users";
import Accounts from "../model/Accounts";
import "reflect-metadata";
import bcrypt from "bcrypt";

const date = new Date();

export const userResolvers = {
    Query: {
        async getAllUsers(_: any, arg: any, context: any) {
            return await Users.find()
        }
    },
    Mutation: {
        async createOrUpdateUser(_: any, { username, data }: any, context: any) {
            const user = await Accounts.find({ username })
            const hashPassword = bcrypt.hashSync(data.password, 10)
            if (user[0]) {
                await Accounts.findOneAndUpdate({ username }, {
                    email: data.email
                })
                await Users.findOneAndUpdate({ username }, {

                    firstName: data.firstName,  
                    lastName: data.lastName,
                    country: data.country,
                    address: data.address,
                    city: data.city,
                    numberPhone: data.numberPhone,
                    email: data.email,

                })
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