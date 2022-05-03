import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    salePrice: Number,
    categories: {
        type: [String],
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            title: String
        }
    ],
    variant: {
        size: [String],
        color: [String]
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})
export default mongoose.model('products', productSchema)