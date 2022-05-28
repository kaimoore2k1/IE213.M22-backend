import {
    userResolvers,
    contactResolver,
    commentResolvers,
    accountResolvers,
    productResolvers,
    adminResolvers,
    billResolver,
    blogResolvers,
    bookingResolver
} from "../resolvers";

const resolvers = [
    accountResolvers, 
    productResolvers, 
    adminResolvers, 
    commentResolvers, 
    blogResolvers, 
    bookingResolver, 
    contactResolver, 
    billResolver, 
    userResolvers
]

export default resolvers