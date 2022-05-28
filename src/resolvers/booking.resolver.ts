import Booking from '../model/Bookings';
import dotenv from 'dotenv';
dotenv.config();

export const bookingResolver = {
	Query: {
		async getAllBooking(_: any, arg: any, context: any) {
			return await Booking.find();
		}
	},

	Mutation: {
		async createBooking(_: any, { name, number, pet, service, time, dateTime, content }: any, context: any) {
			const newBooking = await Booking.create({ name, number, pet, service, time, dateTime, content });
			return newBooking;
		},
		async deleteBookingById(_:any, {_id}:any, context: any) {
			return await Booking.findByIdAndRemove(_id)
		}
	}
};
