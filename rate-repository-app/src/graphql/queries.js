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
				}
			}
		}
	}
`;

// other queries...
