import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.grayBackground
	},
	separator: {
		height: 10
	}
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<View style={styles.separator} />
			<Switch>
				<Route path='/signin' exact>
					<SignIn />
				</Route>
				<Route path='/' exact>
					<RepositoryList />
				</Route>
				<Redirect to='/' />
			</Switch>
		</View>
	);
};

export default Main;
