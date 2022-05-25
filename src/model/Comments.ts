import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const commentSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String,
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
    },
    date: {
        type: Date,
        default: Date.now
    }
});
commentSchema.index({ idProduct: 1,  user: 1 }, { unique: true });
export default mongoose.model('comments', commentSchema);
