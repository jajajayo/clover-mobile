//import Config from 'react-native-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AlertMessage from '../../helpers/AlertMessage'
import axios from '../../helpers/Interceptor'
import axiosOrig from 'axios'
import {transactionActionType} from '../actions'
import {balanceActionType} from '../actions'

export const transactionActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:transactionActionType.LIST_TRANSACTION,payload:{}})
			const {data} = await axios.get('transaction/list')
			if (data.success) {
				await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
			} else {
				await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: data })
			}
		}
	},
	send: (_data) => {
		return async dispatch => {
			await dispatch({type:transactionActionType.SEND_TRANSACTION,payload:{}})
			//const transaction = await axiosOrig.post(`${Config.URI_TRANSACTION}/transaction/broadcast`, {
			const transaction = await axiosOrig.post(`https://blockchain-clover.herokuapp.com/transaction/broadcast`, {
				amount: _data.amount,
				recipient: _data.walletReceive,
				sender: _data.wallet
			})
			if (transaction?.data?.transaction?.id) {
				const {data} = await axios.post('transaction/send', {..._data, idTransaction:transaction.data?.transaction?.id})
				if (data.success) {
					await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
				} else {
					await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: data })
				}
				AlertMessage(data.message)
			} else {
				await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: {success:false} })
				AlertMessage('transactionSendFailed')
			}
		}
	},
}