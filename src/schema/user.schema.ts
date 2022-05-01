import { gql } from 'apollo-server'

export const userTypeDefs = gql`
  interface UserResponse {
    status: String,
    success: Boolean,
    message: String,
  }
  type User implements UserResponse{
    username: String,
    password: String,
    email: String,
    status: String,
    success: Boolean,
    message: String,
    data: User,
    accessToken: String
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    me: User
  }

  input createUserInput {
    username: String!, 
    password: String!, 
    email: String!
  }

  type Mutation {
    createUser(
      username: String!, 
      password: String!, 
      email: String!
    ): User
    updateUser(
      username: String!,
      newUsername: String,
      newPassword: String,
      newEmail: String
    ) : User
    deleteUser(
      username: String!
    ) : User
    login(
      username:String!,
      password:String!
    ): User
  }
`;