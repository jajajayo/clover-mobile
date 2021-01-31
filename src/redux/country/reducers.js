import {countryActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case countryActionType.REGISTER_COUNTRY:
			return{ ...state, isLoading: true }
		break
		case countryActionType.UPDATE_COUNTRY:
			return{ ...state, isLoading: true }
		break
		case countryActionType.LOGIN_COUNTRY:
			return{ ...state, isLoading: true }
		break
		case countryActionType.LOGOUT_COUNTRY:
			return{ ...state, isLoading: true }
		break
		case countryActionType.SUCCESS_COUNTRY:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case countryActionType.ERROR_COUNTRY:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}