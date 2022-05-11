import Comments from "../model/Comments";
import Accounts from "../model/Accounts";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const commentResolvers = {
    Query: {
        async getCommentsByBlogID(_: any, { blogID }: any, context: any) {
            const comments = await Comments.find({ idBlog: blogID })
            const users = await comments.map(({user})=> Accounts.findOne({  _id: user }));
            return {...users, comments}
        },
        async getCommentsByProductID(_: any, { blogID }: any, context: any) {
            const comments = await Comments.find({ idProduct: blogID })
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