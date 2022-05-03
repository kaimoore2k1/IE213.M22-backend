"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.accountTypeDefs = (0, apollo_server_1.gql) `
  interface AccountResponse {
    status: String,
    success: Boolean,
    message: String,
  }
  type Account implements AccountResponse{
    username: String,
    password: String,
    email: String,
    status: String,
    success: Boolean,
    message: String,
    data: Account,
    accessToken: String
  }

  type Query {
    accounts(_id: ID!): Account
  }

  input createUserInput {
    username: String!, 
    password: String!, 
    email: String!
  }

  type Mutation {
    register(
      username: String!, 
      password: String!, 
      email: String!
    ): Account
    updateAccount(
      username: String!,
      newUsername: String,
      newPassword: String,
      newEmail: String
    ) : Account
    deleteAccount(
      username: String!
    ) : Account
    login(
      username:String!,
      password:String!
    ): Account
  }
`;
