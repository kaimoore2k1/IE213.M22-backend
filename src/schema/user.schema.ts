import { gql } from 'apollo-server'
export const typeDefs = gql`
  type User {
    username: String,
    password: String,
    email: String
  }

  type Query {
    user(_id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(
      username: String!, 
      password: String!, 
      email: String!
    ) : User
    updateUser(
      username: String!,
      newUsername: String,
      newPassword: String,
      newEmail: String
    ) : User
    deleteUser(
      username: String!
    ) : User
  }
`;