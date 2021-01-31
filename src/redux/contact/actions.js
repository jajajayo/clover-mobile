import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../helpers/Interceptor'
import {contactActionType} from '../actions'

export const contactActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:contactActionType.LIST_CONTACT,payload:{}})
			const {data} = await axios.get('contact/list')
			if (data.success) {
				await dispatch({ type: contactActionType.SUCCESS_CONTACT, payload: data })
			} else {
				await dispatch({ type: contactActionType.ERROR_CONTACT, payload: data })
			}
		}
	},
	create: (_data) => {
		return async dispatch => {
			await dispatch({type:contactActionType.REGISTER_CONTACT,payload:{}})
			const {data} = await axios.post('contact/create', _data)
			if (data.success) {
				await dispatch({ type: contactActionType.SUCCESS_CONTACT, payload: data })
			} else {
				await dispatch({ type: contactActionType.ERROR_CONTACT, payload: data })
			}
		}
	},
	update: (_data) => {
		return async dispatch => {
			const localData = JSON.parse(await AsyncStorage.getItem('contact'))
			const token = localData.token
			await dispatch({type:contactActionType.UPDATE_CONTACT,payload:{}})
			const {data} = await axios.put('contact/update-profile', _data)
			if(data.success){
				await AsyncStorage.removeItem('contact')
				axios.defaults.headers.common.Authorization = token
				await AsyncStorage.setItem('contact', JSON.stringify({...data.data, token: token}))
				await dispatch({ type: contactActionType.SUCCESS_CONTACT, payload: data })
			}else{
				await dispatch({ type: contactActionType.ERROR_CONTACT, payload: data, localData: localData })
			}
		}
	},
	delete: (_data) => {
		return async dispatch => {
			await dispatch({type:contactActionType.DELETE_CONTACT,payload:{}})
			const {data} = await axios.put('contact/remove', _data)
			if (data.success) {
				await dispatch({ type: contactActionType.SUCCESS_CONTACT, payload: data })
			} else {
				await dispatch({ type: contactActionType.ERROR_CONTACT, payload: data })
			}
		}
	},
}