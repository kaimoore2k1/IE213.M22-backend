import { gql } from 'apollo-server'


export const userTypeDefs = gql`
    type ProductsBooked {
        ID_Product: String,
        quantity: Int
    }
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
        productsBooked: [ProductsBooked]
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
    type BookedProduct {
        ID_Product: String
        name: String,
        price: Int,
        images: [Images],
        quantity: Int
    }
    input BookedProductInput {
        ID_Product: String
        quantity: Int
    }
    type Query {
        getAllUsers: [User]
        getUserByUsername(username: String): User
        getProductBooked(username: String): [BookedProduct]
    }
    type Mutation {
        createOrUpdateUser(username: String!, data: UserInput) : User,
        deleteUser(username: String!): User,
        addProductToCart(username: String!, _id: String): User
        updateProductCart(username: String, data: [BookedProductInput]): User
        clearProductCart(username: String!): User,
    }
`