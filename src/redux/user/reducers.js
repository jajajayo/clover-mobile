import {userActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false,
	localData: []
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
		case userActionType.REQUEST_REGISTRATION_CODE_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.CHECK_REGISTRATION_CODE_USER:
			return{ ...state, isLoading: true }
		break
		case userActionType.SUCCESS_USER:
			return{ ...state, payload: action.payload, isLoading: false, localData: action.localData }
		break
		case userActionType.ERROR_USER:
			return{ ...state, payload: action.payload, isLoading: false, localData: action.localData }
		break
		default:
			return state
	}
}