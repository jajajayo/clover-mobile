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
			/*const a = await axiosOrig.get('http://0ca74df8ab9f.ngrok.io/address/Srjjhfd')
			console.log(a.data)*/
			//const transaction = await axiosOrig.post(`${Config.URI_TRANSACTION}/transaction/broadcast`, {
			const transaction = await axiosOrig.post(`http://192.168.1.3:3001/transaction/broadcast`, {
				amount: _data.amount,
				recipient: _data.walletReceive,
				sender: _data.wallet
			})
			/*const a = await axiosOrig.get('http://929118b4024a.ngrok.io/id/Srjjhfd')
			console.log(a.data)*/
			if (transaction?.data?.transaction?.id) {
				const {data} = await axios.post('transaction/send', {..._data, idTransaction:transaction.data?.transaction?.id})
				if (data.success) {
					/*const socket = await axios.get('transaction/list-socket', { params: { data : {
						id:transaction.data?.transaction?.id,
						amount: _data.amount,
						recipient: _data.walletReceive,
						sender: _data.wallet
					}}})
					let balance = JSON.parse(await AsyncStorage.getItem('balance'))
					balance += _data.amount
					await AsyncStorage.setItem('balance', JSON.stringify(balance))
					//await axiosOrig.get('http://16a88a150e3f.ngrok.io/mine')*/
					await dispatch({ type: transactionActionType.SUCCESS_TRANSACTION, payload: data })
					//await dispatch({ type: balanceActionType.SET_BALANCE, payload: balance })
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