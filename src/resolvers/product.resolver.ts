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
            const product = await Products.findOne({ slugName: "mieng-lot-cho-cho-di-ve-sinh-iris-clean-pet-sheets-cps-42"})
            console.log('product :>> ', product);
            return product;
        },
        async getAllProducts(_: any, arg: any, context: any) {
            return await Products.find()
        }
    }
}