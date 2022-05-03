import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    like: [
        {
            ID_USER: ObjectId
        }
    ],
    images: [
        {
            url: {
                type: String,
                required: true
            },
            title: String
        }
    ],
    share: {
        type: Number,
        required: true
    },
    author: [
        {
            ID_USER: ObjectId
        }
    ],
    categories: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export default mongoose.model('blogs', blogSchema)