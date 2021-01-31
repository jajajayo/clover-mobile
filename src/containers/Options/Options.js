import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { userActions } from '../../../src/redux/user/actions'
import ListCard from '../../components/ListCard'

class Options extends Component {
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
			<Container>
				<Content contentContainerStyle={{paddingTop:'20%'}}>

					<ListCard icon='user' iconColor='green' title={I18n.t('userOptions.updateProfile')} onPress={() => this.props.navigation.navigate('UserUpdate')} />
					<ListCard icon='help-circle' iconColor='green' title={I18n.t('userOptions.help')} />
					<ListCard icon='file' iconColor='green' title={I18n.t('userOptions.terms')} />
					<ListCard icon='more-horizontal' iconColor='green' title={I18n.t('userOptions.contactUs')} />
					<ListCard icon='log-out' iconColor='green' title={I18n.t('userOptions.logout')} onPress={() => this.logout()} />

				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
});

export default
connect(state => ({ user: state.user }),
	dispatch => ({
		create: (data) => dispatch(userActions.create(data)),
		logout:() => dispatch(userActions.logout())
	})
)(Options);