import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Route, Switch, Redirect, Link } from 'react-router-native';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_AUTHORIZED_USER_WITH_REVIEWS } from '../graphql/queries';
import { ReviewItem } from './SingleRepository';

const styles = StyleSheet.create({
	separator: {
		height: 10
	},
	picker: {
		padding: '15px',
		borderColor: 'transparent',
		marginBottom: '5px'
	},
	container: {
		backgroundColor: 'white',
		marginBottom: '5px'
	}
});

const UserReviews = () => {
	const userResult = useQuery(GET_AUTHORIZED_USER_WITH_REVIEWS);

	console.log(userResult);
	if (!userResult.data) return null;

	const reviews = userResult.data.authorizedUser.reviews;
	const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

	return (
		<View style={styles.container}>
			{reviewNodes.length === 0 && <Text>You have no reviews!</Text>}
			{reviewNodes.map((review) => (
				<ReviewItem key={review.id} review={review} />
			))}
		</View>
	);
};

export default UserReviews;
