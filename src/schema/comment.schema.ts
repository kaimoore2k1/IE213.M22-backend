import { gql } from 'apollo-server'

export const commentTypeDefs = gql`
  interface UserResponse {
    status: String,
    success: Boolean,
    message: String,
  }

  type Comment {
    _id: String,
    user:String,
    idProduct:String,
    idBlog:String,
    content:String,
    rating:Float,
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