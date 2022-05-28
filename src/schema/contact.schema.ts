import { gql } from 'apollo-server';

export const contactTypeDefs = gql`
	type Contact {
		_id: String
		name: String
		mail: String
		content: String
	}
	type Mutation {
		createContact(name: String, mail: String, content: String): Contact
		deleteContactById(_id: String): Contact
	}
	type Query {
		getAllContact: [Contact]
	}
`;
