import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const billSchema = new mongoose.Schema({
    products: [
        {
            name: {
                type: String
            },
            quantity: Number,
            price: Number
        }
    ],
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    address: String,
    numberPhone: String,
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
        type: String
    },
    paymentMethod: {
        //required: true,
        type: String
    }
});

export default mongoose.model('bills', billSchema);
