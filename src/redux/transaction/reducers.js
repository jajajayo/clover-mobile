import {transactionActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case transactionActionType.LIST_TRANSACTION:
			return{ ...state, isLoading: true }
		break
		case transactionActionType.SEND_TRANSACTION:
			return{ ...state, isLoading: true }
		break
		case transactionActionType.UPDATE_TRANSACTION:
			return{ ...state, isLoading: true }
		break
		case transactionActionType.DELETE_TRANSACTION:
			return{ ...state, isLoading: true }
		break
		case transactionActionType.SUCCESS_TRANSACTION:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case transactionActionType.ERROR_TRANSACTION:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}