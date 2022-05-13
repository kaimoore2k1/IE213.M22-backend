import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const commentSchema = new mongoose.Schema({
    user: {
        required: true,
        type: ObjectId,
        ref:'users'
    },

    idProduct: {
        type: ObjectId,
        ref: 'products',
    },
    idBlog: {
        type: ObjectId,
        ref: 'blogs'
    },

    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('comments', commentSchema);
