import Contact from '../model/Contacts';
import dotenv from 'dotenv';
dotenv.config();

export const contactResolver = {
	Query: {
		async getAllContact(_: any, arg: any, context: any) {
			return await Contact.find();
		}
	},

	Mutation: {
		async createContact(_: any, { name, mail, content }: any, context: any) {
			const newContact = await Contact.create({ name, mail, content });
			return newContact;
		}
	}
};
