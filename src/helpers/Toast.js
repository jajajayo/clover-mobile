import { Toast } from 'native-base'

export default (props, type = 'default') => {
	Toast.show({
		text: props.title,
		buttonText: (props.buttonText) ? props.buttonText : 'Ok',
		style: {
			top: -30
		},
		type: type,
		position: 'top',
		duration: 6000
	})
}