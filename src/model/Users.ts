import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: String,
    address: String,
    city: String,
    numberPhone: String,
    email: {
        type: String
    },
    dateCreate: {
        type: String
    },
    productsBooked: [
        {
            ID_Product: ObjectId
        }
    ],
    avatarUrl: String
})

export default mongoose.model('users', userSchema)