import Users from "../model/Users";
import Products from "../model/Products";
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
        async getUserByUsername(_: any, { username }: any, context: any) {
            if (typeof (username) === 'string') {
                const data = await Users.findOne({ username: username });
                return data;
            }

        },
        async getProductBooked(_: any, { username }: any, context: any) {
            const listIdProducts = await Users.findOne({ username })

            const productsInfor: any[] = listIdProducts.productsBooked.map(async (e: any) => {
                const data = await Products.findById(e.ID_Product)

                return { ...data._doc, quantity: e.quantity, ID_Product: e.ID_Product }
            })
            return productsInfor
        }
    },
    Mutation: {
        async deleteUser(_: any, { username }: any, context: any) {
            await Accounts.findOneAndRemove({ username })
            return await Users.findOneAndRemove({ username })
        },
        async createOrUpdateUser(_: any, { username, data }: any, context: any) {
            const user = await Users.find({ username });
            const initialUser = await Accounts.find({ username })
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
        },

        async updateUser(_: any, { username, data }: any, context: any) {
            const user = await Users.find({ username });

            const hashPassword = bcrypt.hashSync(data.password, 10)

            if (user[0]) {
                // await Accounts.findOneAndUpdate({ username }, {
                //     email: data.email
                // })

                const newUser = await Users.findOneAndUpdate({ username }, {

                    firstName: data.firstName,
                    lastName: data.lastName,
                    country: data.country,
                    address: data.address,
                    city: data.city,
                    numberPhone: data.numberPhone,
                    email: data.email,

                })

                return newUser;

            }

        },
        async addProductToCart(_: any, { username, _id }: any, context: any) {
            const products = await Users.findOne({ username })
            let flag = false
            products.productsBooked.map((e: any) => {
                if (e.ID_Product == _id) {
                    console.log(true)
                    flag = true
                    e.quantity++
                }
            })
            if (!flag) {
                products.productsBooked.push({
                    ID_Product: _id,
                    quantity: 1
                })
            }
            console.log(products)
            return await Users.findOneAndUpdate({ username }, {
                productsBooked: products.productsBooked
            })
        },
        async updateProductCart(_: any, { username, data }: any, context: any) {
            return await Users.findOneAndUpdate({ username }, {
                productsBooked: data
            })
        },
        async clearProductCart(_: any, { username }: any, context: any) {
            return await Users.findOneAndUpdate({ username }, {
                productsBooked: []
            })
        }
    }
}