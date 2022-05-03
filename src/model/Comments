import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const commentSchema = new mongoose.Schema({
	user: {
		required: true,
		type: ObjectId,
	},
    id: {
        required: true,
        type: [
            {
                ID_PRODUCT:ObjectId
            },
            {
                ID_BLOG:ObjectId
            }
        ]
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

export default mongoose.model('comments', commentSchema);
