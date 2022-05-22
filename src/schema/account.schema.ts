import { gql } from 'apollo-server'


export const accountTypeDefs = gql`
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
    accessToken: String,
    tokenVersion: Int
  }

  type Query {
    accounts: [Account],
    me: Account,
    getAccountByName(username: String): Account
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
    logout(username: String!): Account
  }
`;