import { gql } from 'apollo-server'


export const adminTypeDefs = gql`
    type Admin {
        username: String!,
        password: String!,
        status: String,
        success: Boolean,
        message: String,
        data: Admin,
        accessToken: String
    }
    type Mutation {
        adminLogin(
            username: String!,
            password: String!
        ): Admin
    }
`