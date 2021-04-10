import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					stargazersCount
					ownerAvatarUrl
					fullName
					language
					reviewCount
					ratingAverage
					forksCount
				}
			}
		}
	}
`;

export const GET_AUTHORIZED_USER = gql`
	query {
		authorizedUser {
			id
			username
		}
	}
`;

// other queries...
