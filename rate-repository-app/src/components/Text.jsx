import React from 'react';
import { Text as NativeText, StyleSheet, Platform } from 'react-native';

import theme from '../theme';

const getPlatformFont = () => {
	if (Platform.OS === 'android') {
		return theme.fonts.roboto;
	} else if (Platform.OS === 'ios') {
		return theme.fonts.arial;
	} else {
		return theme.fonts.system;
	}
};

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.body,
		fontFamily: getPlatformFont(),
		fontWeight: theme.fontWeights.normal
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary
	},
	colorBlack: {
		color: theme.colors.black
	},
	colorPrimary: {
		color: theme.colors.primary
	},
	colorWhite: {
		color: theme.colors.white
	},
	fontSizeSubheading: {
		fontSize: theme.fontSizes.subheading
	},
	fontWeightBold: {
		fontWeight: theme.fontWeights.bold
	}
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === 'textSecondary' && styles.colorTextSecondary,
		color === 'primary' && styles.colorPrimary,
		color === 'white' && styles.colorWhite,
		color === 'black' && styles.colorBlack,
		fontSize === 'subheading' && styles.fontSizeSubheading,
		fontWeight === 'bold' && styles.fontWeightBold,
		style
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;
