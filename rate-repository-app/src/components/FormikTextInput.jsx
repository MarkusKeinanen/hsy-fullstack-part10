import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
		color: theme.colors.darkRed
	},
	textInputStyle: {
		padding: '8px',
		borderRadius: '4px',
		marginTop: '10px'
	},
	textInputStyleError: {
		padding: '8px',
		borderRadius: '4px',
		marginTop: '10px'
	},
	textNormalBorder: {
		border: '1px solid lightgray'
	},
	textRedBorder: {
		border: `1px solid ${theme.colors.darkRed}`
	}
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	const inputStyle = [styles.textInputStyle, showError ? styles.textRedBorder : styles.textNormalBorder];

	return (
		<>
			<TextInput
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				style={inputStyle}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;
