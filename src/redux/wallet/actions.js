import axios from '../../helpers/Interceptor'
import {walletActionType} from '../actions'

export const walletActions = {
	listWallet: (_data) => {
		return async dispatch => {
			await dispatch({type:walletActionType.LIST_WALLET,payload:{}})
			const {data} = await axios.get('wallet/list')
			if (data.success) {
				await dispatch({ type: walletActionType.SUCCESS_WALLET, payload: data })
			} else {
				await dispatch({ type: walletActionType.ERROR_WALLET, payload: data })
			}
		}
	},
}