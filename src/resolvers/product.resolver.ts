import Products from "../model/Products";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const productResolvers = {
    Query: {
        async getAllProductsByCategory(_: any, { categories }: any, context: any) {
            const products = await Products.find({ categories: { $in: [categories] } })
            return products
        },
        async getProductByName(_: any, { slugName }: any, context: any) {
            const product = await Products.findOne({slugName})
            return product;
        },
        async getAllProducts(_: any, arg: any, context: any) {
            return await Products.find()
        }
    },
    Mutation: {
        async updateProductByName(_:any, {name, data} : any, context:any) {
            const getProduct = await Products.find({name})
            if (getProduct[0]) {
                return await Products.findOneAndUpdate({name}, {
                    name : data.name,
                    price : data.price,
                    stock : data.stock,
                    salePrice : data.salePrice,
                    categories : data.categories,
                    description: data.description,
                    content: data.content,
                    slugName: data.slugName
                })
            }
            else {
                return await Products.create({
                    name : data.name,
                    price : data.price,
                    stock : data.stock,
                    salePrice : data.salePrice,
                    categories : data.categories,
                    description: data.description,
                    content: data.content,
                    slugName: data.slugName
                })
            }
        }
    }
}