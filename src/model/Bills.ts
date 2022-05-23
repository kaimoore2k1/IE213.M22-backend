import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const billSchema = new mongoose.Schema({
    products: {
        name: {
            required: true,
            type: String
        },
        quantity: {
            required: true,
            type: Number
        }
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
