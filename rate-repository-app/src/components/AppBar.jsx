import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Route, Switch, Redirect, Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
	const loggedUserResult = useQuery(GET_AUTHORIZED_USER);
	const loggedIn = loggedUserResult && loggedUserResult.data && loggedUserResult.data.authorizedUser !== null;

	const apolloClient = useApolloClient();
	const storage = useAuthStorage();

	// const check = async () => {
	// 	const token = await storage.getAccessToken();
	// 	console.log(token);
	// };
	// check();

	const signOut = async () => {
		if (loggedIn) {
			await storage.removeAccessToken();
			apolloClient.resetStore();
		}
	};

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
				{loggedIn && (
					<Pressable>
						<Link to='/create-review'>
							<Text style={styles.textStyle} color={'white'}>
								Create a review
							</Text>
						</Link>
					</Pressable>
				)}
				<Pressable onPress={() => signOut()}>
					{loggedIn ? (
						<Text style={styles.textStyle} color={'white'}>
							Sign out
						</Text>
					) : (
						<Link to='/signin'>
							<Text style={styles.textStyle} color={'white'}>
								{loggedIn ? 'Sign out' : 'Sign in'}
							</Text>
						</Link>
					)}
				</Pressable>
				{!loggedIn && (
					<Link to='/signup'>
						<Text style={styles.textStyle} color={'white'}>
							Sign up
						</Text>
					</Link>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
