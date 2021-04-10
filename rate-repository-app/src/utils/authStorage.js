import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		const accessToken = await AsyncStorage.getItem(`${this.namespace}:authtoken`);
		return accessToken ? accessToken : null;
	}

	async setAccessToken(accessToken) {
		AsyncStorage.setItem(`${this.namespace}:authtoken`, accessToken);
	}

	async removeAccessToken() {
		await AsyncStorage.removeItem(`${this.namespace}:authtoken`);
	}
}

export default AuthStorage;
