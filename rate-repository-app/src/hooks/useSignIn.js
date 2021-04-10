import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHORIZE, {
		onError: (error) => {
			console.log(error.toString());
		}
	});

	const authStorage = useAuthStorage();

	const signIn = async ({ username, password }) => {
		const res = await mutate({ variables: { username, password } });
		const accessToken = res.data.authorize.accessToken;
		authStorage.setAccessToken(accessToken);
		console.log('set access token to: ' + accessToken);
		return res;
	};

	return [signIn, result];
};

export default useSignIn;
