import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network'
	});
	const repositories = data ? data.repositories : undefined;

	return { repositories, error, loading, refetch };
};

export default useRepositories;
