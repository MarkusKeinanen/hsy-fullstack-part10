import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
	mutation runAuthorization($username: String!, $password: String!) {
		authorize(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`;

// other queries...
