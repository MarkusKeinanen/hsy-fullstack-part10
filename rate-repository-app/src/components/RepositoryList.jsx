import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem key={item.fullName} item={item} />;

const RepositoryList = () => {
	const { repositories, error, loading, refetch } = useRepositories();
	console.log(repositories);
	// Get the nodes from the edges array
	const repositoryNodes = repositories !== undefined ? repositories.edges.map((edge) => edge.node) : [];

	return <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} renderItem={renderItem} />;
};

export default RepositoryList;
