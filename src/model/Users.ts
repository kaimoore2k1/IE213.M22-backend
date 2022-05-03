import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    individualData: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        country: String,
        address: String,
        city: String,
        numberPhone: String,
        email: {
            type: String,
            required: true
        }
    },
    dateCreate: {
        type: Date,
        required: true
    },
    productsBooked: [
        {
            ID_Product: ObjectId
        }
    ],
    avatarUrl: String
})

export default mongoose.model('users', userSchema)