import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { userActions } from '../redux/user/actions'

class UnderConstruction extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	logout = async () => {
		await this.props.logout()
		this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
	}

	render() {
		return (
			<Container padder>
				<Text style={{fontSize:30, textAlign:'center'}}>En Construcción</Text>
				<Button rounded full onPress={() => this.logout()} style={{marginTop:'50%', alignSelf:'center'}}>
					<Text style={{color:'white'}}>Cerrar Sesión</Text>
				</Button>
			</Container>
		);
	}
}

const styles = StyleSheet.create({});

export default 
	connect(state => ({
		user: state.user
	}),
	dispatch => ({
		logout:() => dispatch(userActions.logout())
	})
)(UnderConstruction);