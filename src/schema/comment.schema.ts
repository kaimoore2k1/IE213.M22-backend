import { gql } from 'apollo-server'
import mongoose from 'mongoose'


export const commentTypeDefs = gql`
  # interface UserResponse {
  #   status: String,
  #   success: Boolean,
  #   message: String,
  # }
    scalar Date
  type Comment {
    _id: String,
    user:String,
    idProduct:String,
    idBlog:String,
    content:String,
    rating:Float,
    username: String,
    avatar: String,
    date:Date,
  }
  type Query {
    getCommentsByBlogID(blogID: String!): [Comment],
    getCommentsByProductID(productID: String!): [Comment],
  }
  
  type Mutation {
    createComment(
      user:  String,
      idProduct: String,
      idBlog: String,
      content: String!,
      rating: Float,
    ):Comment,
  }
`;