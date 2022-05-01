import Products from "../model/Products";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

export const productResolvers = {
    Query: {
        async getAllProductsByCategory(_: any, { category }: any, context: any) {
            const products = await Products.find({category})
            return products
        },
        async getProductByName(_:any, {name}: any, context: any) {
            const product = await Products.findOne({name})
            return product
        }
    }
}