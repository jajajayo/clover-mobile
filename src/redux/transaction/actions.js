import AlertMessage from '../../helpers/AlertMessage'
import axios from '../../helpers/Interceptor'
import axiosOrig from 'axios'
import {transactionActionType} from '../actions'

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
			/*const a = await axiosOrig.get('http://0ca74df8ab9f.ngrok.io/address/Srjjhfd')
			console.log(a.data)*/
			/*const transaction = await axiosOrig.post('http://0ca74df8ab9f.ngrok.io/transaction/broadcast', {
				amount: _data.amount,
				recipient: _data.walletReceive,
				sender: _data.wallet
			})
			console.log('transaction.data ', transaction.data)*/
			const {data} = await axios.post('transaction/send', {..._data})
			if (data.success) {
				await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
			} else {
				await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: data })
			}
			AlertMessage(data.message)
		}
	},
	update: (_data) => {
		return async dispatch => {
			await dispatch({type:transactionActionType.UPDATE_TRANSACTION,payload:{}})
			const {data} = await axios.put('transaction/update', _data)
			if(data.success){
				await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
			}else{
				await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: data })
			}
			AlertMessage(data.message)
		}
	},
	delete: (_data) => {
		return async dispatch => {
			await dispatch({type:transactionActionType.DELETE_TRANSACTION,payload:{}})
			const {data} = await axios.put('transaction/remove', _data)
			if (data.success) {
				await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
			} else {
				await dispatch({ type: transactionActionType.ERROR_TRANSACTION, payload: data })
			}
			AlertMessage(data.message)
		}
	},
}