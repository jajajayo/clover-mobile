import { Alert } from 'react-native'

module.exports = function (message) {
	const success = 'Operación exitosa'
	const failed = 'Operación fallida'
	const errors = {
		'SERVER_ERROR': {
			message: failed,
			description: 'Ha ocurrido un error en el servidor'
		},
		'USER_INVALID': {
			message: failed,
			description: 'Usuario o contraseña incorrecta'
		},
		'USER_ROL_INVALID': {
			message: failed,
			description: 'Este usuario no tiene acceso desde esta aplicación'
		},
		'USER_LOGIN_SUCCESS': {
			description: 'Sesión iniciada correctamente'
		},
		'SUCCESS_REGISTER': {
			message: success,
			description: 'Se ha registrado exitosamente'
		},
		'FAILED_REGISTER': {
			message: failed,
			description: 'No se ha podido realizar el registro'
		},
		'SUCCESS_UPDATE': {
			message: success,
			description: 'Se ha actualizado exitosamente'
		},
		'FAILED_UPDATE': {
			message: failed,
			description: 'No se ha podido actualizar el registro'
		},
		'FAILED_OPERATION': {
			description: 'Operación fallida'
		},
		'LOCATION_SUCCESS_REGISTER': {
			message: success,
			description: 'Ubicación registrada exitosamente'
		},
		'LOCATION_FAILED_REGISTER': {
			message: failed,
			description: 'No se ha podido registrar la ubicación'
		},
		'LOCATION_SUCCESS_UPDATE': {
			message: success,
			description: 'Ubicación modificada exitosamente'
		},
		'LOCATION_FAILED_UPDATE': {
			message: failed,
			description: 'No se ha podido modificar la ubicación'
		},
		'LOCATION_SUCCESS_DELETE': {
			message: success,
			description: 'Ubicación eliminada exitosamente'
		},
		'LOCATION_FAILED_DELETE': {
			message: failed,
			description: 'No se ha podido eliminar la ubicación'
		},
		'INVOICE_SUCCESS_REGISTER': {
			message: success,
			description: 'Su compra se ha completado exitosamente'
		},
		'INVOICE_FAILED_REGISTER': {
			message: failed,
			description: 'No se ha podido efectuar su compra'
		},
	}

	if (errors[message]) {
		Alert.alert((errors[message].message) ? errors[message].message : '', (errors[message].description) ? errors[message].description : '')
	} else {
		Alert.alert('Configure el mensaje', message)
	}
}