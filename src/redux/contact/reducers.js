import {contactActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case contactActionType.LIST_CONTACT:
			return{ ...state, isLoading: true }
		break
		case contactActionType.REGISTER_CONTACT:
			return{ ...state, isLoading: true }
		break
		case contactActionType.UPDATE_CONTACT:
			return{ ...state, isLoading: true }
		break
		case contactActionType.DELETE_CONTACT:
			return{ ...state, isLoading: true }
		break
		case contactActionType.SUCCESS_CONTACT:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case contactActionType.ERROR_CONTACT:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}