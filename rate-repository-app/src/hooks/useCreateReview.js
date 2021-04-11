import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useCreateReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW, {
		onError: (error) => {
			window.alert(error.toString());
		}
	});
	//runCreateMutate($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String)

	const createReview = async ({ repositoryName, ownerName, rating, text }) => {
		const res = await mutate({ variables: { repositoryName, ownerName, rating, text } });
		return res;
	};

	return [createReview, result];
};

export default useCreateReview;
