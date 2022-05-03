import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const billSchema = new mongoose.Schema({
	ID_USER: {
        type: ObjectId,
        required: true
    },
    products: {
        required: true,
        type: [
            {
                ID_PRODUCT: {
                    required: true,
                    type: ObjectId
                }
            }
        ]
    },
    paymentInfor: {
        firstName: {
            required: true,
            type: String
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
        },
        code: String,
        paymentMethod: {
            required: true,
            type: String
        },
        note: String,
        voucher: String
    },
    total: {
        required: true,
        type: Number
    },
    amount: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    }
});

export default mongoose.model('comments', billSchema);
