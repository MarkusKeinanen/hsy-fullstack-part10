import React, { useContext } from 'react';
import { Text, TextInput, Pressable, View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { RenderContext } from '../components/Main';
import * as yup from 'yup';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: '15px'
	},
	submitButton: {
		marginTop: '10px'
	}
});

const validationSchema = yup.object().shape({
	username: yup.string().min(3, 'Length must be 3 or more').required('Username is required'),
	password: yup.string().min(3, 'Length must be 3 or more').required('Password is required'),
	password2: yup
		.string()
		.min(3, 'Length must be 3 or more')
		.oneOf([yup.ref('password'), null])
		.required('Password confirm is required')
});

const initialValues = {
	username: '',
	password: '',
	password2: ''
};

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput name='username' placeholder='Username' />
			<FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
			<FormikTextInput name='password2' placeholder='Password confirmation' secureTextEntry={true} />
			<View style={styles.submitButton}>
				<Button testID='submitButton' onPress={onSubmit} title='Sign up' />
			</View>
		</View>
	);
};

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {
	const [signIn] = useSignIn();
	const [signUp] = useSignUp();
	const history = useHistory();
	const onSubmit = async (values) => {
		const { username, password } = values;
		try {
			const res = await signUp({ username, password });
			if (!res) return null;
			const res2 = await signIn({ username, password });
			history.push('/');
		} catch (e) {
			console.log(e);
		}
	};
	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
