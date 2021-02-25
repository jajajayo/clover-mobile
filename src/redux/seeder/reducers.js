import {seederActionType} from '../actions'

const initialState = {
	payload: [],
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case seederActionType.LIST_RANDOM_SEEDER:
			return{ ...state, isLoading: true }
		break
		case seederActionType.SUCCESS_SEEDER:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		case seederActionType.ERROR_SEEDER:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}