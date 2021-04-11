import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserReviews from './UserReviews';
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
				<Route path='/signup' exact>
					<SignUp />
				</Route>
				<Route path='/create-review' exact>
					<CreateReview />
				</Route>
				<Route path='/my-reviews' exact>
					<UserReviews />
				</Route>
				<Route path='/repositories/:id' exact>
					<SingleRepository />
				</Route>
				<Route path='(|/repositories)' exact>
					<RepositoryList />
				</Route>
				<Redirect to='/' />
			</Switch>
		</View>
	);
};

export default Main;
