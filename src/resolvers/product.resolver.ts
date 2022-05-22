import Products from "../model/Products";
import Comments from "../model/Comments";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const productResolvers = {
    Query: {
        async getAllProductsByCategory(_: any, { categories }: any, context: any) {
            let products = await Products.aggregate([
                { $match: { categories: { $in: [categories] } } },
                {
                    $lookup: {
                        "from": "comments",
                        "localField": "_id",
                        "foreignField": "idProduct",
                        "as": "comments"
                    }
                }]);
            //get product by category and get comments from table comment table
            return products
        },
        async getProductByName(_: any, { slugName }: any, context: any) {
            const product = await Products.aggregate([
                { $match: { slugName: slugName } },
                {
                    $lookup: {
                        "from": "comments",
                        "localField": "_id",
                        "foreignField": "idProduct",
                        "as": "comments"
                    }
                }]);
                
            return product[0];
        },
        async getAllProducts(_: any, arg: any, context: any) {
            return await Products.find()
        }
    }
}