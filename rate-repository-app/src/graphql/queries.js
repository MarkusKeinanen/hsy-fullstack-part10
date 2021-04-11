import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					id
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

export const GET_REPOSITORIES_SORT = (searchKeyword, orderBy, orderDirection) => gql`
	query {
		repositories(searchKeyword: "${searchKeyword}", orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
			edges {
				node {
					id
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

export const GET_REPOSITORY = (id) => gql`
	query {
		repository(id: "${id}") {
			id
			url
			stargazersCount
			ownerAvatarUrl
			fullName
			language
			reviewCount
			ratingAverage
			forksCount
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
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
