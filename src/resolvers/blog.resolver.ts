import Blogs from "../model/Blogs";
import "reflect-metadata";

export const blogResolvers = {
    Query: {
        async getAllBlogs(_: any, a: any, context: any) {
            let blogs = await Blogs.aggregate([
                {
                    $lookup: {
                        "from": "comments",
                        "localField": "_id",
                        "foreignField": "idBlog",
                        "as": "comments"
                    }
                }])
            //get product by category and get comments from table comment table
            return blogs
        },
        async getHotBlogs(_: any, a: any, context: any) {
            let blogs = await Blogs.aggregate([{ $sort: { "like": -1 } },{
                $lookup: {
                    "from": "comments",
                    "localField": "_id",
                    "foreignField": "idBlog",
                    "as": "comments"
                }
            }])
            return blogs
        },
        async getBlogBySlug(_: any, { slug }: any, ontext: any) {
            let blog = await Blogs.findOne({ slug: slug })
            return blog
        }
    }
}