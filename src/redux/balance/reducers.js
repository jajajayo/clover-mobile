import {balanceActionType} from '../actions'

const initialState = {
	payload: '0.00',
	isLoading: false,
	error: false
}

export default (state = initialState, action) => {
	switch(action.type){
		case balanceActionType.SET_BALANCE:
			return{ ...state, payload: action.payload, isLoading: false }
		break
		default:
			return state
	}
}