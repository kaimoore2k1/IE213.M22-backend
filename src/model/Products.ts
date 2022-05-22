import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    salePrice: Number,
    categories: {
        type: [String]
    },
    images: [
        {
            url: {
                type: String
            },
            title: String
        }
    ],
    variant: {
        size: [String],
        color: [String]
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    rating: {
        type: Number
    },
    slugName:{
        type: String
    }
})
export default mongoose.model('products', productSchema)