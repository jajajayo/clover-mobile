import axios from '../../helpers/Interceptor'
import {seederActionType} from '../actions'

export const seederActions = {
	listRandom: (_data) => {
		return async dispatch => {
			await dispatch({type:seederActionType.LIST_RANDOM_SEEDER,payload:{}})
			const {data} = await axios.get('seeder/list-random')
			if (data.success) {
				await dispatch({ type: seederActionType.SUCCESS_SEEDER, payload: data })
			} else {
				await dispatch({ type: seederActionType.ERROR_SEEDER, payload: data })
			}
		}
	},
}