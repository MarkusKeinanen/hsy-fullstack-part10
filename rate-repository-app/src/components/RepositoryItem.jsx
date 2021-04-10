import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

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
		borderRadius: '6px',
		marginRight: '15px'
	},
	description: {
		marginTop: '5px'
	},
	fullname: {
		paddingTop: '0px',
		fontWeight: 700
	},
	languageTag: {
		padding: '5px',
		marginTop: '5px',
		borderRadius: '6px',
		backgroundColor: theme.colors.primary,
		alignSelf: 'flex-start'
	},
	rowItemTitle: {
		fontWeight: 700
	},
	extraDataBox: {
		marginRight: '20px'
	}
});

const RepositoryItem = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={styles.containerSideways}>
				<Image style={styles.tinyProfileImg} source={item.ownerAvatarUrl} />
				<View>
					<Text style={styles.fullname} color='black'>
						{item.fullName}
					</Text>
					<Text style={styles.description}>{item.description}</Text>
					<View style={styles.languageTag}>
						<Text color='white'>{item.language}</Text>
					</View>
				</View>
			</View>

			<View style={styles.extraData}>
				<View style={styles.extraDataBox}>
					<Text style={styles.rowItemTitle} color='black'>
						{(item.stargazersCount / 1000).toFixed(1)}k
					</Text>
					<Text>Stars </Text>
				</View>
				<View style={styles.extraDataBox}>
					<Text style={styles.rowItemTitle} color='black'>
						{(item.forksCount / 1000).toFixed(1)}k
					</Text>
					<Text>Forks </Text>
				</View>
				<View style={styles.extraDataBox}>
					<Text style={styles.rowItemTitle} color='black'>
						{item.reviewCount}
					</Text>
					<Text>Reviews </Text>
				</View>
				<View style={styles.extraDataBox}>
					<Text style={styles.rowItemTitle} color='black'>
						{item.ratingAverage}
					</Text>
					<Text>Rating </Text>
				</View>
			</View>
		</View>
	);
};
export default RepositoryItem;
