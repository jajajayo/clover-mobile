import axios from '../../helpers/Interceptor'
import {cryptocoinActionType} from '../actions'

export const cryptocoinActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:cryptocoinActionType.LIST_CRYPTOCOIN,payload:{}})
			const {data} = await axios.get('criptocoin/list')
			if (data.success) {
				await dispatch({ type: cryptocoinActionType.SUCCESS_CRYPTOCOIN, payload: data })
			} else {
				await dispatch({ type: cryptocoinActionType.ERROR_CRYPTOCOIN, payload: data })
			}
		}
	},
}