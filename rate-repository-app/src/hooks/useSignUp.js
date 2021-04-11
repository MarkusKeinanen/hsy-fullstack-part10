import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignUp = () => {
	const [mutate, result] = useMutation(CREATE_USER, {
		onError: (error) => {
			console.log(error.toString());
		}
	});

	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signUp = async ({ username, password }) => {
		const res = await mutate({ variables: { username, password } });
		apolloClient.resetStore();
		return res;
	};

	return [signUp, result];
};

export default useSignUp;
