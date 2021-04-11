import React, { useContext } from 'react';
import { Text, TextInput, Pressable, View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik, useField } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { RenderContext } from '../components/Main';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

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
	repositoryName: yup.string().min(3, 'Length must be 3 or more').required('Repository name name is required'),
	ownerName: yup.string().min(3, 'Length must be 3 or more').required('Owner name is required'),
	rating: yup.number().min(0).max(100).required('Rating is required')
});

const initialValues = {
	repositoryName: '',
	ownerName: '',
	rating: '',
	text: ''
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput name='repositoryName' placeholder='Repository name' />
			<FormikTextInput name='ownerName' placeholder='Owner name' />
			<FormikTextInput name='rating' placeholder='Rating (0-100)' />
			<FormikTextInput name='text' placeholder='Review comment' multiline={true} />
			<View style={styles.submitButton}>
				<Button onPress={onSubmit} title='Create a review' />
			</View>
		</View>
	);
};

export const CreateReviewContainer = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const CreateReview = () => {
	const [createReview, result] = useCreateReview();
	const history = useHistory();

	const onSubmit = async (values) => {
		const { repositoryName, ownerName, rating, text } = values;
		try {
			const res = await createReview({ repositoryName, ownerName, rating: parseInt(rating), text });
			if (!res) return null;
			history.push(`/repositories/${ownerName}.${repositoryName}`);
		} catch (e) {
			console.log(e);
		}
	};
	return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
