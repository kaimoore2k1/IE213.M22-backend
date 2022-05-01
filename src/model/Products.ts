import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        }
    },
    evaluate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})
export default mongoose.model('products', productSchema)