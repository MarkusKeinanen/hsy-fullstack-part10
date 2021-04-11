import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useSortedRepositories from '../hooks/useSortedRepositories';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
	separator: {
		height: 10
	},
	picker: {
		padding: '15px',
		borderColor: 'transparent',
		marginBottom: '5px'
	},
	textInput: {
		backgroundColor: 'white',
		padding: '15px',
		marginBottom: '5px'
	}
});

const sortingOtions = [
	{
		name: 'Latest repositories',
		orderBy: 'CREATED_AT',
		orderDirection: 'ASC'
	},
	{
		name: 'Highest rated repositories',
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC'
	},
	{
		name: 'Lowest rated repositories',
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'ASC'
	}
];

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => <RepositoryItem key={item.fullName} item={item} />;

export const RepositoryListContainer = ({ repositories, sorting, setSorting, setSearchKeyword }) => {
	const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

	const [searchVal, setSearchVal] = useState('');

	const debounceRef = useRef();
	const setAfter = (val) => {
		debounceRef.current = setTimeout(() => {
			setSearchKeyword(val);
			debounceRef.current = null;
		}, 500);
	};

	return (
		<>
			<TextInput
				style={styles.textInput}
				value={searchVal}
				placeholder='Filter by name'
				onChangeText={(text) => {
					setSearchVal(text);
					setAfter(text);
				}}
			/>
			<FlatList
				data={repositoryNodes}
				renderItem={renderItem}
				keyExtractor={({ id }) => id}
				ListHeaderComponent={() =>
					sorting ? (
						<>
							<Picker
								style={styles.picker}
								selectedValue={sorting && sorting.name}
								onValueChange={(itemValue) => setSorting(sortingOtions.find((o) => o.name === itemValue))}
							>
								{sortingOtions.map((option) => (
									<Picker.Item key={option.name} label={option.name} value={option.name} />
								))}
							</Picker>
						</>
					) : (
						<View></View>
					)
				}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</>
	);
};

const RepositoryList = () => {
	const [sorting, setSorting] = useState(sortingOtions[0]);
	const [searchKeyword, setSearchKeyword] = useState('');
	const { repositories } = useSortedRepositories(searchKeyword, sorting.orderBy, sorting.orderDirection);
	return (
		<RepositoryListContainer
			repositories={repositories}
			sorting={sorting}
			setSorting={setSorting}
			searchKeyword={searchKeyword}
			setSearchKeyword={setSearchKeyword}
		/>
	);
};

export default RepositoryList;

////////////////////////////////////////////////////////THIS CODE WAS USED FOR TESTS SECTION  (10.17 & 10-18)
// import React, { useState, useEffect } from 'react';
// import { FlatList, View, StyleSheet } from 'react-native';
// import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';

// const styles = StyleSheet.create({
// 	separator: {
// 		height: 10
// 	}
// });

// const ItemSeparator = () => <View style={styles.separator} />;

// const renderItem = ({ item }) => <RepositoryItem key={item.fullName} item={item} />;

// export const RepositoryListContainer = ({ repositories }) => {
// 	const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

// 	return <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} renderItem={renderItem} />;
// };

// const RepositoryList = () => {
// 	const { repositories } = useRepositories();

// 	return <RepositoryListContainer repositories={repositories} />;
// };

// export default RepositoryList;
