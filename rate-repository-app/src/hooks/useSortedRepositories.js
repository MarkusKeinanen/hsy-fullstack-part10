import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES_SORT } from '../graphql/queries';

const useRepositories = (searchKeyword, orderBy, orderDirection) => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES_SORT(searchKeyword, orderBy, orderDirection), {
		fetchPolicy: 'cache-and-network'
	});
	const repositories = data ? data.repositories : undefined;

	return { repositories, error, loading, refetch };
};

export default useRepositories;
