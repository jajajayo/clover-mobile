import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { setLocale, syncTranslationWithStore, loadTranslations,i18nReducer } from 'react-redux-i18n'
import { Platform, NativeModules } from 'react-native'

import { languages } from './i18n';
import Reducers from './reducers'

const store = createStore(Reducers, applyMiddleware(thunk))

syncTranslationWithStore(store);

store.dispatch(loadTranslations(languages));

let deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale :
    NativeModules.I18nManager.localeIdentifier;

if (deviceLanguage === undefined) {
	deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0]
}

const locale = deviceLanguage.split( Platform.OS === 'ios' ? '-' : '_')[0]

store.dispatch(setLocale(locale));

export default store