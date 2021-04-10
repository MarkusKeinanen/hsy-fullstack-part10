import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Route, Switch, Redirect, Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';

const styles = StyleSheet.create(
	(() => {
		const container = {
			paddingTop: Constants.statusBarHeight,
			backgroundColor: 'black',
			color: 'white',
			paddingBottom: '5px',
			textAlign: 'center'
		};
		const flexSideways = {
			display: 'flex',
			flexDirection: 'row'
		};
		return {
			appBarStyle: {
				...container
			},
			textStyle: {
				padding: '8px'
			},
			flexSideways: {
				...flexSideways
			}
		};
	})()
);

const AppBar = () => {
	return (
		<View style={styles.appBarStyle}>
			<ScrollView horizontal>
				<Pressable>
					<Link to='/'>
						<Text style={styles.textStyle} color={'white'}>
							Repositories
						</Text>
					</Link>
				</Pressable>
				<Pressable>
					<Link to='/signin'>
						<Text style={styles.textStyle} color={'white'}>
							Sign in
						</Text>
					</Link>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default AppBar;
