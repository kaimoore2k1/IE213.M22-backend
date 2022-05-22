import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model('bookings', bookingSchema);