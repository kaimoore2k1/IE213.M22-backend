import Comments from "../model/Comments";
import Accounts from "../model/Accounts";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const commentResolvers = {
    Query: {
        async getCommentsByBlogID(_: any, { blogID }: any, context: any) {
            const comments = await Comments.find({ idBlog: blogID })
            // const users = await comments.map(({user})=> Accounts.findOne({  _id: user }));
            // return { username: "testuser", avatar:"https://cdn.senshop.tech/Product/Food/sup-thuong-cho-cho-smartheart-2.jpg" , ...comments }
            return comments
        },
        async getCommentsByProductID(_: any, { productID }: any, context: any) {
            let comments = await Comments.find({ idProduct: productID })
            // comments= comments.map(async (comment)=>{
            //     // let user = await Accounts.find({ _id: comment.user })
            //     return { ...comment, username: "testuser", avatar:"https://cdn.senshop.tech/Product/Food/sup-thuong-cho-cho-smartheart-2.jpg" }

            //     // return { ...comment, username: user[0].username, avatar: user[0].avatar }
            // });
            return comments
        },
    },
    Mutation: {
        async createComment(_: any, { idProduct, idBlog, user, content, rating }: any, context: any) {
            const newComment = await Comments.create({ idProduct, idBlog, user, content, rating })
            return newComment
        }
    }
}