import Schema from 'validate'
import { validation } from '../../helpers/Validation'

const fields = {
	email: {
		required: true,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: {
			match: 'Ingrese un correo electrónico válido',
			required: 'Ingrese el correo electrónico del contacto'
		}
	}
}

export const validate = (data, required = {}) => {
	let exclude = []

	if (required) {
		for (const index in required) {
			fields[index].required = required[index]
			if (data[index] === '' && !required[index]) {
				if (!required[index]) {
					exclude.push(index)
				}
			}
		}
	}

	const values = validation.setValues(fields, data, exclude)
	const schema = new Schema(values)
	const errors = schema.validate(data)
	if (errors.length > 0) {
		validation.setErrors(errors, exclude)
	}
	return errors
}