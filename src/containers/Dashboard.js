import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
import { connect } from 'react-redux'

import { userActions } from '../../src/redux/user/actions'
import { validations } from '../../src/helpers/Validate'
import alertMessage from '../../src/helpers/AlertMessage'

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {
	}// Fin de DidMount

	logout = async () => {
		await this.props.logout()
	}

	render() {
		const { navigation } = this.props
		return (
			<Content padder>
				<Text style={styles.title}>Dashboard</Text>
				<Button full style={styles.buttonLogin} onPress={this.logout}>
					<Text style={{color:'white', fontWeight:'bold'}}>Cerrar Sesión</Text>
				</Button>
			</Content>
		)
	}
}

const styles = StyleSheet.create({
	margin: {
		marginTop: 30
	},
	title: {
		textAlign: 'center',
		margin: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	},
	buttonLogin: {
		marginTop: 50,
		borderRadius: 10
	},
	forgotPassword: {
		textAlign: 'center',
		color: 'blue',
		marginTop: 10
	},
	goRegister: {
		textAlign: 'center',
		color: 'blue',
		marginTop: 60
	}
});

export default
	connect(state => ({ user: state.user }),
		dispatch => ({
			logout: (data) => dispatch(userActions.logout(data))
		})
	)(Login);