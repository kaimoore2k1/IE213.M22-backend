import { gql } from 'apollo-server';

export const bookingTypeDefs = gql`
	type Booking {
		_id: String
		name: String
		number: String
		pet: String
		service: String
		time: String
		dateTime: String
		content: String
	}
    type Mutation {
        createBooking(
            name: String
            number: String
            pet: String
            service: String
            time: String
            dateTime: String
            content: String
        ):Booking,
      }
      type Query {
        getAllBooking: [Booking]
      }
`;
