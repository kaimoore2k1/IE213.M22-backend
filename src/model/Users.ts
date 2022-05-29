import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country:{
        type: String
    } ,
    address: {
        type: String
    },
    city: {
        type: String
    },
    numberPhone: {
        type: String
    },
    email: {
        type: String
    },
    dateCreate: {
        type: String
    },
    productsBooked: [
        {
            ID_Product: ObjectId,
            quantity: Number
        }
    ],
    avatarUrl: {
        type: String
    } 
})

export default mongoose.model('users', userSchema)