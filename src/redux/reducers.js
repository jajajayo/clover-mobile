import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n'

import user from './user/reducers'
import store from './store/reducers'
import country from './country/reducers'
import cryptocoin from './cryptocoin/reducers'
import contact from './contact/reducers'
import seeder from './seeder/reducers'
import transaction from './transaction/reducers'
import balance from './balance/reducers'
import wallet from './wallet/reducers'

export default combineReducers({
	i18n: i18nReducer,
	user,
	store,
	country,
	cryptocoin,
	contact,
	seeder,
	transaction,
	balance,
	wallet
})