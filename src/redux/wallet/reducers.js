import {walletActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case walletActionType.LIST_WALLET:
			return{ ...state, isLoading: true }
		break
		case walletActionType.SUCCESS_WALLET:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case walletActionType.ERROR_WALLET:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}