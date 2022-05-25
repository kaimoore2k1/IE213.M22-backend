import { gql } from 'apollo-server'
import mongoose from 'mongoose';

export const blogTypeDefs = gql`
  type Image {
    url: String
  }
  type Comment {
    _id: String,
    user:String,
    idProduct:String,
    idBlog:String,
    content:String,
    username: String,
    avatar: String,
  }
  type Blog {
    _id: String
    title: String
    date:  Date
    like: [String]
    comments:[Comment]
    image: Image
    share: Int
    author: String
    category:  String
    description:  String
    content:  String
    slug: String
  }
  
  type Query {
    getAllBlogs: [Blog]
    getHotBlogs: [Blog]
    getBlogBySlug(slug: String): Blog

  }
  type Mutation{
    createBlog(title: String, image: String, author: String, category: String, description: String, content: String, slug: String): Blog
    updateBlog(id: String, title: String, image: String, author: String, category: String, description: String, content: String, slug: String): Blog  
    deleteBlog(id: String): Blog
    likeBlog(_id: String, user: String): Blog
  }
`;