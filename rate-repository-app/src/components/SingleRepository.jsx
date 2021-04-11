import React, { useEffect } from 'react';
import { Button, View, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { useParams, useHistory } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexGrow: 4,
		flexShrink: 1,
		backgroundColor: 'white',
		padding: '15px',
		marginTop: '7px'
	},
	containerSideways: {
		display: 'flex',
		flexDirection: 'row'
	},
	submitButton: {
		marginTop: '10px'
	},
	score: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
		borderRadius: 25,
		borderStyle: 'solid',
		borderColor: theme.colors.primary,
		borderWidth: 2,
		marginRight: 16,
		marginBottom: 12
	},
	reviewName: {
		marginBottom: 7
	}
});

export const ReviewItem = ({ review }) => {
	const date = new Date(review.createdAt);

	return (
		<View style={styles.container}>
			<View style={styles.containerSideways}>
				<View style={styles.score}>
					<View>
						<Text color='primary' fontWeight='bold'>
							{review.rating}
						</Text>
					</View>
				</View>
				<View>
					<Text style={styles.reviewName} fontWeight='bold'>
						{review.user.username}
					</Text>
					<Text>{date.toLocaleDateString()}</Text>
				</View>
			</View>
			<Text>{review.text}</Text>
		</View>
	);
};

const SingleRepository = () => {
	const history = useHistory();
	const params = useParams();
	const { repository, refetch } = useRepository(params.id);

	useEffect(() => {
		refetch();
	}, []);

	if (!repository) {
		return <div>Getting repository item with id: {params.id} ...</div>;
	}
	let reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];

	return (
		<View>
			<FlatList
				data={reviews}
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={({ id }) => id}
				ListHeaderComponent={() => <RepositoryItem item={repository} fullView={true} />}
			/>
		</View>
	);
};

export default SingleRepository;
