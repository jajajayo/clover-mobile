import AlertMessage from '../../helpers/AlertMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../helpers/Interceptor'
import {userActionType} from '../actions'
import {balanceActionType} from '../actions'
import {getToken} from '../../helpers/PushNotification'

export const userActions = {
	getLocalData: () => {
		return async dispatch => {
			await dispatch({type:userActionType.GET_LOGIN_DATA_USER,payload:{}})
			const data = JSON.parse(await AsyncStorage.getItem('user'))
			const balance = JSON.parse(await AsyncStorage.getItem('balance'))
			if (data) {
				axios.defaults.headers.common.Authorization = data.token
				await dispatch({ type: userActionType.SUCCESS_USER, localData: data })
				await dispatch({ type: balanceActionType.SET_BALANCE, payload: balance })
			} else {
				await dispatch({ type: userActionType.ERROR_USER, payload: null })
			}
			return data
		}
	},
	login: (_data) => {
		return async dispatch => {
			await dispatch({ type:userActionType.LOGIN_USER,payload: {} })
			await AsyncStorage.removeItem('user')
			_data.firebaseToken = await getToken()
			const {data} = await axios.post('user/login', _data)
			if (data.success) {
				axios.defaults.headers.common.Authorization = data.data.token
				await AsyncStorage.setItem('user', JSON.stringify(data.data))
				await dispatch({ type: userActionType.SUCCESS_USER, payload: data, localData: data.data })
			} else {
				await dispatch({ type: userActionType.ERROR_USER, payload: data })
			}
			AlertMessage(data.message)
		}
	},
	logout: (_data) => {
		return async dispatch => {
			await dispatch({type:userActionType.LOGOUT_USER,payload:{}})
			await AsyncStorage.removeItem('user')
			await dispatch({type:userActionType.SUCCESS_USER,payload: { success: true }, localData: null})
		}
	},
	create: (_data) => {
		return async dispatch => {
			await dispatch({type:userActionType.REGISTER_USER,payload:{}})
			const {data} = await axios.post('user/create-app', _data)
			if (data.success) {
				await AsyncStorage.removeItem('user')
				axios.defaults.headers.common.Authorization = data.data.token
				await AsyncStorage.setItem('user', JSON.stringify(data.data))
				await dispatch({ type: userActionType.SUCCESS_USER, payload: data, localData: data.data })
			} else {
				await dispatch({ type: userActionType.ERROR_USER, payload: data })
			}
			AlertMessage(data.message)
		}
	},
	update: (_data) => {
		return async dispatch => {
			const localData = JSON.parse(await AsyncStorage.getItem('user'))
			const token = localData.token
			await dispatch({type:userActionType.UPDATE_USER,payload:{}})
			const {data} = await axios.put('user/update-profile', _data)
			if(data.success){
				await AsyncStorage.removeItem('user')
				axios.defaults.headers.common.Authorization = token
				await AsyncStorage.setItem('user', JSON.stringify({...data.data, token: token}))
				await dispatch({ type: userActionType.SUCCESS_USER, payload: data, localData: data.data })
			}else{
				await dispatch({ type: userActionType.ERROR_USER, payload: data, localData: localData })
			}
			AlertMessage(data.message)
		}
	},
	requestRegistrationCode: (_data) => {
		return async dispatch => {
			await dispatch({type:userActionType.REQUEST_REGISTRATION_CODE_USER,payload:{}})
			const {data} = await axios.post('user/request-registration-code', _data)
			if(data.success){
				await dispatch({type:userActionType.SUCCESS_USER,payload:data})
			}else{
				await dispatch({type:userActionType.ERROR_USER,payload:data})
			}
			AlertMessage(data.message)
		}
	},
	checkRegistrationCode: (_data) => {
		return async dispatch => {
			await dispatch({type:userActionType.CHECK_REGISTRATION_CODE_USER,payload:{}})
			const {data} = await axios.get('user/check-registration-code', {params: _data})
			if(data.success){
				await dispatch({type:userActionType.SUCCESS_USER,payload:data})
			}else{
				await dispatch({type:userActionType.ERROR_USER,payload:data})
			}
			AlertMessage(data.message)
		}
	},
	/*getUserLocation: (_data) => {
		return async dispatch => {
			const userLocation = JSON.parse(await AsyncStorage.getItem('userLocation'))
			const userLocalData = JSON.parse(await AsyncStorage.getItem('login'))
			await dispatch({type: userActionType.SUCCESS_USER, payload: {
				success: true,
				userLocation: userLocation
			}})
		}
	},
	setUserLocation: (_data) => {
		return async dispatch => {
			await AsyncStorage.removeItem('userLocation')
			if (_data.id_country) {
				await AsyncStorage.setItem('userLocation', JSON.stringify({
					id_country: _data.id_country
				}))
			}
		}
	},
	pushNotification: (_data) => {
		return async dispatch => {
			await userService.pushNotification(_data)
		}
	},*/
}