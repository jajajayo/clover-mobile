import axios from '../../helpers/Interceptor'
import {storeActionType} from '../actions'

export const storeActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:storeActionType.REGISTER_STORE,payload:{}})
			const {data} = axios.get('store/list')
			if (data) {
				await dispatch({ type: storeActionType.SUCCESS_STORE, payload: data })
			} else {
				await dispatch({ type: storeActionType.ERROR_STORE, payload: data })
			}
		}
	},
}