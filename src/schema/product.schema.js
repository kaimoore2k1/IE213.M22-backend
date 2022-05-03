"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.productTypeDefs = (0, apollo_server_1.gql) `
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
    getAllProductsByCategory(categories: [String]!): [Product]
    getProductByName(name: String!): Product
  }
`;
