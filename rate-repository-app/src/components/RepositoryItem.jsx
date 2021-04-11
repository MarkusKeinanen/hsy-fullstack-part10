import React from 'react';
import { Button, View, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { useParams, useHistory } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexGrow: 4,
		flexShrink: 1,
		backgroundColor: 'white',
		padding: '15px'
	},
	containerSideways: {
		display: 'flex',
		flexDirection: 'row'
	},
	extraData: {
		display: 'flex',
		flexGrow: 4,
		flexShrink: 1,
		flexDirection: 'row',
		marginTop: '15px'
	},
	separator: {
		height: 10
	},
	tinyProfileImg: {
		width: 50,
		height: 50,
		borderRadius: 6,
		marginRight: '15px'
	},
	description: {
		marginTop: '5px'
	},
	fullname: {
		paddingTop: '0px',
		fontWeight: '700'
	},
	languageTag: {
		padding: '5px',
		marginTop: '5px',
		borderRadius: 6,
		backgroundColor: theme.colors.primary,
		alignSelf: 'flex-start'
	},
	rowItemTitle: {
		fontWeight: '700'
	},
	extraDataBox: {
		marginRight: '20px'
	},
	submitButton: {
		marginTop: '10px'
	}
});

const RepositoryItem = ({ item, fullView }) => {
	const history = useHistory();
	const params = useParams();

	const goToId = () => {
		if (fullView === undefined) {
			history.push(`/repositories/${item.id}`);
		}
	};

	const openLink = (url) => {
		Linking.openURL(url);
	};

	return (
		<Pressable onPress={() => goToId()}>
			<View style={styles.container}>
				<View style={styles.containerSideways}>
					<Image
						style={styles.tinyProfileImg}
						source={{
							uri: item.ownerAvatarUrl
						}}
					/>
					<View>
						<Text testID={`repository-item-fullname-${item.id}`} style={styles.fullname} color='black'>
							{item.fullName}
						</Text>
						<Text testID={`repository-item-description-${item.id}`} style={styles.description}>
							{item.description}
						</Text>
						<View style={styles.languageTag}>
							<Text testID={`repository-item-language-${item.id}`} color='white'>
								{item.language}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.extraData}>
					<View style={styles.extraDataBox}>
						<Text testID={`repository-item-stargazers-${item.id}`} style={styles.rowItemTitle} color='black'>
							{(item.stargazersCount / 1000).toFixed(1)}k
						</Text>
						<Text>Stars </Text>
					</View>
					<View style={styles.extraDataBox}>
						<Text testID={`repository-item-forks-${item.id}`} style={styles.rowItemTitle} color='black'>
							{(item.forksCount / 1000).toFixed(1)}k
						</Text>
						<Text>Forks </Text>
					</View>
					<View style={styles.extraDataBox}>
						<Text testID={`repository-item-reviews-${item.id}`} style={styles.rowItemTitle} color='black'>
							{item.reviewCount}
						</Text>
						<Text>Reviews </Text>
					</View>
					<View style={styles.extraDataBox}>
						<Text testID={`repository-item-rating-${item.id}`} style={styles.rowItemTitle} color='black'>
							{item.ratingAverage}
						</Text>
						<Text>Rating </Text>
					</View>
				</View>
				{item.url && (
					<View style={styles.submitButton}>
						<Link to={`/repositories/${item.id}`}>
							<Button title='Open in GitHub' onPress={() => openLink(item.url)} />
						</Link>
					</View>
				)}
			</View>
		</Pressable>
	);
};
export default RepositoryItem;
