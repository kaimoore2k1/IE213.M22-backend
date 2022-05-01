import { gql } from 'apollo-server'

export const productTypeDefs = gql`
  interface UserResponse {
    status: String,
    success: Boolean,
    message: String,
  }

  type Image {
    url: String!,
    title: String!
  }

  type Product implements UserResponse{
    name: String,
    price: Int,
    image: Image,
    evaluate: Int,
    description: String,
    category: String,
    data: Product,
    status: String,
    success: Boolean,
    message: String,
  }

  type Query {
    getAllProductsByCategory(category: String!): [Product]
    getProductByName(name: String!): Product
  }
`;