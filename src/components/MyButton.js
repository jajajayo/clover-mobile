import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
import {I18n} from 'react-redux-i18n'

class MyButton extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {
	}

	render() {
		const props = this.props
		return (
			<View style={[styles.container, props.containerStyle ? props.containerStyle : {}]} >
				<Button 
					full
					success={props.success ? props.success : false}
					style={[styles.button, (props.success) ? {backgroundColor: '#49CC68'} : {}]}
					bordered={props.bordered ? props.bordered : false}
					{...props} 
				>
					<Text style={{...styles.textButton, color: props.bordered ? 'green' : 'white'}}>{props.text ? props.text : ''}</Text>
				</Button>
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
	button: {
		borderRadius: 30,
		height: 55
	},
	textButton: {
		fontWeight:'bold',
		fontSize: 16
	}
});

export default MyButton