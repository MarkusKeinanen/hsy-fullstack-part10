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
		borderRadius: 4,
		marginTop: '10px',
		borderWidth: 1,
		borderStyle: 'solid'
	},
	textNormalBorder: {
		borderColor: 'lightgray'
	},
	textRedBorder: {
		borderColor: `${theme.colors.darkRed}`
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
