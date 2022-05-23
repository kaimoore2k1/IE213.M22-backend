import { gql } from 'apollo-server'
import mongoose from 'mongoose';

export const productTypeDefs = gql`
  interface UserResponse {
    status: String,
    success: Boolean,
    message: String,
  }

  type Variant {
  size: [String]
  color: [String]
  }

  type Images {
    url: String
    title: String
  }
  type Comment {
    _id: String,
    user:String,
    idProduct:String,
    idBlog:String,
    content:String,
    rating:Float,
    username: String,
    avatar: String,
  }
  type Product {
    _id: String
    name: String
    price: Int
    stock: Int
    salePrice: Int
    description: String
    content: String
    rating: Int
    variant: Variant
    images: [Images]
    categories: [String]
    slugName: String
    ratingCount: Int
    comments: [Comment]
  }

  type Query {
    getAllProductsByCategory(categories:String!): [Product]
    getProductByName(slugName: String!): Product
    getAllProducts: [Product]
  }

  input InputVariant {
    size: [String]
    color: [String]
  }

  input InputImages {
    url: String
    title: String
  }

  input ProductInput {
    _id: String
    name: String
    price: Int
    stock: Int
    salePrice: Int
    description: String
    content: String
    rating: Int
    variant: InputVariant
    images: [InputImages]
    categories: [String]
    slugName: String
  }

  type Mutation {
    updateProductByName(
      name: String!,
      data: ProductInput
    ): Product
  }
`;