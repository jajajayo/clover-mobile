import Schema from 'validate'

const validationList = {
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
	password: {
		required: true,
		type: String,
		length: { min: 4, max: 12 },
		message: {
			required: 'La contraseña es obligatoria',
			length: 'La contraseña debe tener entre 4 y 12 caracteres'
		}
	},
	phoneNumber: {
		required: true,
		match: /^[0-9]+$/,
		length: { min: 6, max: 14 },
		message: {
			required: 'Ingrese un número de celular',
			match: 'El número de celular sólo puede contener números',
			length: 'Ingrese un número de celular válido'
		}
	},
	nameGeneric: {
		required: true,
		type: String,
		message: {
			required: 'Ingrese un nombre'
		}
	},
	idPaymentType: {
		required: true,
		message: {
			required: 'Seleccione un tipo de pago'
		}
	},
	idBank: {
		required: true,
		message: {
			required: 'Seleccione un banco'
		}
	},
	referencePayment: {
		required: true,
		match: /^[0-9a-zA-Z]+$/,
		message: {
			required: 'Ingrese la referencia',
			match: 'Ingrese una referencia válida'
		}
	},
	date: {
		required: true,
		match: /^[0-9-]+$/,
		message: {
			required: 'Ingrese la fecha',
			match: 'Ingrese una fecha válida'
		}
	},
	idAccount: {
		required: true,
		match: /^[0-9a-zA-Z]+$/,
		message: {
			required: 'Ingrese la cuenta',
			match: 'Ingrese una cuenta válida'
		}
	},
	numberPhone: {
		required: true,
		match: /^[+0-9]+$/,
		message: {
			required: 'El número de celular es obligatorio',
			match: 'Ingrese un número de celular válido'
		}
	},
	code: {
		required: true,
		match: /^[0-9]+$/,
		message: {
			required: 'El código es obligatorio',
			match: 'Ingrese un código válido'
		}
	},
	idCountry: {
		required: true,
		type: String,
		message: {
			required: 'El país es obligatorio',
		}
	},
}

export const validations = {
	setValidations: (fields) => {
		let values = {}
		fields.map(field => {
			values[field] = validationList[field]
		})
		return new Schema(values)
	},
	showErrors: (errors) => {
		let errorMessage = ''
		for (let i = 0; i < errors.length; i ++) {
			errorMessage += (i != 0) ? '\n* ' : '* '
			errorMessage += errors[i].message
		}
		alert(errorMessage)
	}
}