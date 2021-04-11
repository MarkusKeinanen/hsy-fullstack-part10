import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepositories = (id) => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORY(id), {
		fetchPolicy: 'cache-and-network'
	});
	const repository = data ? data.repository : undefined;
	return { repository, error, loading, refetch };
};

export default useRepositories;
