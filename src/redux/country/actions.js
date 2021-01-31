import axios from '../../helpers/Interceptor'
import {countryActionType} from '../actions'

export const countryActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:countryActionType.REGISTER_COUNTRY,payload:{}})
			const {data} = await axios.get('country/list')
			if (data.success) {
				await dispatch({ type: countryActionType.SUCCESS_COUNTRY, payload: data })
			} else {
				await dispatch({ type: countryActionType.ERROR_COUNTRY, payload: data })
			}
		}
	},
}