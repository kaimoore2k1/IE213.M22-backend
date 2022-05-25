import Comments from "../model/Comments";
import Accounts from "../model/Accounts";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const commentResolvers = {
    Query: {
        async getCommentsByBlogID(_: any, { blogID }: any, context: any) {
            const comments = await Comments.find({ idBlog: blogID })
           
            return comments
        },
        async getCommentsByProductID(_: any, { productID }: any, context: any) {
            let comments = await Comments.find({ idProduct: productID })

            return comments
        },
        async getAllComments(_: any, arg: any, context: any) {
			const comments =  await Comments.find();
            return comments
		}
    },
    Mutation: {
        async createComment(_: any, { idProduct, idBlog, user, content, rating }: any, context: any) {
            const newComment = await Comments.create({ idProduct, idBlog, user, content, rating })
            return newComment
        },
        async updateComment(_: any, { _id,user,   content, rating }: any, context: any) {
            const comment = await Comments.findOneAndUpdate({ _id,user }, {  content, rating,date:new Date() })
            return comment
        },
        async deleteComment(_: any, { _id }: any, context: any) {
            const comment = await Comments.findOneAndDelete({ _id })
            return comment
        }
    }
}