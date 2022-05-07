import Products from "../model/Products";
import "reflect-metadata";
import dotenv from "dotenv";
import toSlug from "../utils/toSlug";
dotenv.config();

export const productResolvers = {
    Query: {
        async getAllProductsByCategory(_: any, { categories }: any, context: any) {
            const products = await Products.find({categories})
            return products
        },
        async getProductByName(_:any, {slugName}: any, context: any) {
            const products = await Products.find()
  
            return  products.find(product => toSlug(product.name) === slugName)
        },
        async getAllProducts(_: any, arg: any, context: any){
            return await Products.find()
        }
    }
}