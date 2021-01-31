import {userActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case userActionType.GET_LOGIN_DATA_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.REGISTER_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.UPDATE_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.LOGIN_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.LOGOUT_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.SUCCESS_USER:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case userActionType.ERROR_USER:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}