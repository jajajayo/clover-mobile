import { Alert } from 'react-native'
import Toast from './Toast'
import {I18n} from 'react-redux-i18n'

module.exports = function (message) {
	const success = 'Operación exitosa'
	const failed = 'Operación fallida'
	const errors = {
		//LOGIN
		'loginSuccess': { description: I18n.t('login.loginSuccess'), type: 'success' },
		'invalidPassword': { description: I18n.t('login.invalidPassword'), type: 'danger' },
		//USER REGISTRATION
		'userCreateSuccess': { description: I18n.t('register.createSuccess'), type: 'success' },
		'userCreateFailed': { description: I18n.t('register.createFailed'), type: 'danger' },
		'userEmailExists': { description: I18n.t('register.emailExists'), type: 'danger' },
		//USER VERIFICATION CODE
		'resendCodeMsg': { description: I18n.t('registerVerification.resendCodeMsg'), type: 'success' },
		'errorSendCodeMsg': { description: I18n.t('registerVerification.errorSendCodeMsg'), type: 'danger' },
		'invalidCodeReg': { description: I18n.t('registerVerification.invalidCodeReg'), type: 'danger' },
		'maxAttemptsCodeReg': { description: I18n.t('registerVerification.maxAttemptsCodeReg'), type: 'danger' },
		//USER UPDATE PROFILE
		'userUpdateProfileSuccess': { description: I18n.t('userUpdate.success'), type: 'success' },
		'userUpdateProfileFailed': { description: I18n.t('userUpdate.failed'), type: 'danger' },
		//CONTACT
		'contactAddSuccess': { description: I18n.t('contact.addSuccess'), type: 'success' },
		'contactAddFailed': { description: I18n.t('contact.addFailed'), type: 'danger' },
		'contactAlreadyExists': { description: I18n.t('contact.alreadyExists'), type: 'danger' },
		'contactOwnSelectedUser': { description: I18n.t('contact.ownSelectedUser'), type: 'danger' },
		'contactNotExistsUser': { description: I18n.t('contact.notExistsUser'), type: 'danger' },
		'contactUpdateSuccess': { description: I18n.t('contact.updateSuccess'), type: 'success' },
		'contactUpdateFailed': { description: I18n.t('contact.updateFailed'), type: 'danger' },
		'contactDeleteSuccess': { description: I18n.t('contact.deleteSuccess'), type: 'success' },
	}

	if (errors[message]) {
		Toast({
			title: errors[message].description
		}, (errors[message].type) ? errors[message].type : 'default')
		//Alert.alert((errors[message].message) ? errors[message].message : '', (errors[message].description) ? errors[message].description : '')
	} else if (message) {
		Toast({title: 'Configure el mensaje \n' + message})
		//Alert.alert('Configure el mensaje', message)
	}
}