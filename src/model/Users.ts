import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country:{
        type: String
    } ,
    address: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    numberPhone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateCreate: {
        type: String
    },
    productsBooked: [
        {
            ID_Product: ObjectId
        }
    ],
    avatarUrl: {
        type: String
    } 
})

export default mongoose.model('users', userSchema)