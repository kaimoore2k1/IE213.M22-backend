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