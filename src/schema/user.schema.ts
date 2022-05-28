import { gql } from 'apollo-server'


export const userTypeDefs = gql`
    type User {
        username: String,
        firstName: String,
        lastName: String,
        country: String,
        address: String,
        city: String,
        numberPhone: String,
        email: String,
        dateCreate: String,
        productsBooked: [String]
    }
    input UserInput {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        country: String,
        address: String,
        city: String,
        numberPhone: String,
        email: String
    }
    type Query {
        getAllUsers: [User]
        getUserByUsername(username: String): User
    }
    type Mutation {
        createOrUpdateUser(username: String!, data: UserInput) : User
    }
`