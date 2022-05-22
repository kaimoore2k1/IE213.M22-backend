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