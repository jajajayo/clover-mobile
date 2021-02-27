import AlertMessage from '../../helpers/AlertMessage'
import axios from '../../helpers/Interceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosOrig from 'axios'
import {cryptocoinActionType} from '../actions'

export const cryptocoinActions = {
	list: (_data) => {
		return async dispatch => {
			await dispatch({type:cryptocoinActionType.LIST_CRYPTOCOIN,payload:{}})
			const {data} = await axios.get('cryptocoin/list')
			if (data.success) {
				await dispatch({ type: cryptocoinActionType.SUCCESS_CRYPTOCOIN, payload: data })
			} else {
				await dispatch({ type: cryptocoinActionType.ERROR_CRYPTOCOIN, payload: data })
			}
		}
	},
	create: (_data) => {
		return async dispatch => {
			await dispatch({type:cryptocoinActionType.CREATE_CRYPTOCOIN,payload:{}})
			const result = await axiosOrig.post('https://blockchain-clover.herokuapp.com/new-wallet', {..._data})
			if (result?.data?.privateKey) {
				const {data} = await axios.put('user/set-cryptocoin', {cryptocoin: result.data, idCryptocoin:_data.idCryptocoin})
				if (data.success) {
					let user = JSON.parse(await AsyncStorage.getItem('user'))
					user.cryptocoins = data.data?.cryptocoins
					await AsyncStorage.setItem('user', JSON.stringify(user))
					await dispatch({ type: cryptocoinActionType.SUCCESS_CRYPTOCOIN, payload: data })
				} else {
					await dispatch({ type: cryptocoinActionType.ERROR_CRYPTOCOIN, payload: data })
				}
				AlertMessage(data.message)
			} else {
				await dispatch({ type: cryptocoinActionType.ERROR_CRYPTOCOIN, payload: {data:{success:false}} })
				AlertMessage('userSetCryptocoinFailed')
			}
		}
	},
}