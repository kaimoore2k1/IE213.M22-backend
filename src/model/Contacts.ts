import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	mail: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

export default mongoose.model('contacts', contactSchema);
