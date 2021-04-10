import React from 'react';
import { Text, TextInput, Pressable, View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import useSignIn from '../hooks/useSignIn';
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
	password: yup.string().min(3, 'Length must be 3 or more').required('Password is required')
});

const initialValues = {
	username: '',
	password: ''
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput name='username' placeholder='Username' />
			<FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
			<View style={styles.submitButton}>
				<Button onPress={onSubmit} title='Sign in' />
			</View>
		</View>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();

	const onSubmit = async (values) => {
		const { username, password } = values;
		try {
			const { data } = await signIn({ username, password });
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
