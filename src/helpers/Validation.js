import { Alert } from 'react-native'
export const validation = {
	setErrors: (errors, showToast, exclude) => {
		let errorMessage = ''
		for (let i = 0; i < errors.length; i ++) {
			if (!exclude.includes(errors[i].path)) {
				errorMessage += (i != 0) ? '\n* ' : '* '
				errorMessage += errors[i].message
			}
		}
		//Alert.alert('Error en el formulario', errorMessage)
		showToast({
			title: errorMessage
		}, 'danger')
	},
	setValues: (fields, data, exclude) => {
		let values = {}
		for (const index in data) {
			if (!exclude.includes(index)) {
				values[index] = fields[index]
			}
		}
		return values
	}
}