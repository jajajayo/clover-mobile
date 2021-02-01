import AlertMessage from '../../helpers/AlertMessage'
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
			AlertMessage(data.message)
		}
	},
	update: (_data) => {
		return async dispatch => {
			await dispatch({type:contactActionType.UPDATE_CONTACT,payload:{}})
			const {data} = await axios.put('contact/update', _data)
			if(data.success){
				await dispatch({ type: contactActionType.SUCCESS_CONTACT, payload: data })
			}else{
				await dispatch({ type: contactActionType.ERROR_CONTACT, payload: data })
			}
			AlertMessage(data.message)
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
			AlertMessage(data.message)
		}
	},
}