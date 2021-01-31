import {cryptocoinActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case cryptocoinActionType.LIST_CRYPTOCOIN:
			return{ ...state, isLoading: true }
		break
		case cryptocoinActionType.SUCCESS_CRYPTOCOIN:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case cryptocoinActionType.ERROR_CRYPTOCOIN:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}