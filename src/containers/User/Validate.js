import Schema from 'validate'
import { validation } from '../../helpers/Validation'

const fields = {
	name: {
		required: true,
		match: /^[A-Za-z ÁÉÍÓÚáéíóú.]+$/,
		message: {
			match: 'Ingrese un nombre válido',
			required: 'El nombre es obligatorio'
		}
	},
	lastName: {
		required: true,
		match: /^[A-Za-z ÁÉÍÓÚáéíóú.]+$/,
		message: {
			match: 'Ingrese un apellido válido',
			required: 'El apellido es obligatorio'
		}
	},
	email: {
		required: true,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: {
			match: 'Ingrese un correo válido',
			required: 'El correo es obligatorio'
		}
	},
	numberPhone: {
		required: true,
		match: /^[+0-9]+$/,
		length: { min: 6, max: 14 },
		message: {
			required: 'Ingrese un número de celular',
			match: 'El número de celular sólo puede contener números',
			length: 'Ingrese un número de celular válido'
		}
	},
	idCountry: {
		required: true,
		type: String,
		message: {
			required: 'Seleccione un país'
		}
	},
	referredUser: {
		required: false,
		type: String
	},
	password: {
		required: true,
		type: String,
		length: { min: 4, max: 12 },
		message: {
			required: 'La contraseña es obligatoria',
			length: 'La contraseña debe tener entre 4 y 12 caracteres'
		}
	},
	code: {
		required: true,
		match: /^[0-9]+$/,
		message: {
			required: 'Ingrese el código de verificación',
			match: 'El código debe ser numérico'
		}
	}
}

export const validate = (data, showToast, required = {}) => {
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
		validation.setErrors(errors, showToast, exclude)
	}
	return errors
}