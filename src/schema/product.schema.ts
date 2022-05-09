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
  }

  type Query {
    getAllProductsByCategory(categories:String!): [Product]
    getProductByName(slugName: String!): Product
    getAllProducts: [Product]
  }
`;