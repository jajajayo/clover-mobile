import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {I18n} from 'react-redux-i18n'

class MyTextInput extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {
	}

	render() {
		return (
			<View style={styles.container} >
				<TextInput style={styles.textInput} {...this.props} placeholderTextColor='green' />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingTop: 10,
		paddingBottom: 10
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 30,
		borderColor: 'green',
		paddingLeft: 15,
		color: 'green',
		fontSize: 16
	}
});

export default MyTextInput