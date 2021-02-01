import Toast from './Toast'
export const validation = {
	setErrors: (errors, exclude) => {
		let errorMessage = ''
		for (let i = 0; i < errors.length; i ++) {
			if (!exclude.includes(errors[i].path)) {
				errorMessage += (i != 0) ? '\n* ' : '* '
				errorMessage += errors[i].message
			}
		}
		
		Toast({
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