import Schema from 'validate'
import { validation } from '../../helpers/Validation'

const fields = {
	amount: {
		required: true,
		type: Number,
		message: {
			required: 'Ingrese la cantidad',
			type: 'La cantidad debe ser numérica'
		}
	},
	walletReceive: {
		required: true,
		type: String,
		message: {
			required: 'Ingresa la wallet del destinatario'
		}
	}
}

export const validate = (data, required = {}) => {
	let exclude = []

	if (required) {
		for (const index in required) {
			fields[index].required = required[index]
			if (data[index] === '' && !required[index]) {
				//fields[index].length = false
				//fields[index].match = false
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