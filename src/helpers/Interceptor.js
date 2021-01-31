import axios from 'axios'
import Config from 'react-native-config'
//import AsyncStorage from '@react-native-community/async-storage'

//axios.defaults.baseURL = 'http://192.168.1.20:4007/api/';
axios.defaults.baseURL = Config.URI_API

axios.interceptors.response.use(
	async function(response) {
		return response;
	},
	async function(err) {
		try {
			console.log('error', err)
			return err.response
		} catch (e) {
			console.log('catch')
			return {
				data: {
					success: false,
					message: e.toString(),
					data: {}
				}
			}
		}
	}
);

axios.defaults.params = {};
/*axios.interceptors.request.use(async function (config) {
	//const userLocation = JSON.parse(await AsyncStorage.getItem('userLocation'))
	//config.params['id_country_location'] = (userLocation != null) ? userLocation.id_country : userLocation;
	return config;
}, function (error) {
	return Promise.reject(error);
});*/

export default axios;