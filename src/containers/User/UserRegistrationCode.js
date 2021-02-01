import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { validate } from './Validate'
import { userActions } from '../../../src/redux/user/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
import MyLink from '../../components/MyLink'

class UserRegistrationCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			numberPhone: this.props.route?.params?.numberPhone || null
		}
	}

	checkRegistrationCode = async () => {
		const sendData = {
			code: this.state.code,
			numberPhone: this.state.numberPhone
		}
		const errors = validate(sendData)
		if (errors.length == 0) {
			await this.props.checkRegistrationCode(sendData)
			
			if (this.props.user.payload.success) {
				this.props.route.params.create()
			}
		}
	}

	render() {
		return (
			<Container>
				<Content padder>
					<Text style={styles.subTitle}>{I18n.t('registerVerification.weHaveSentCode')}</Text>
					<MyTextInput onChangeText={(v) => this.setState({ code:v })} placeholder={I18n.t('registerVerification.code')} />
					<MyButton containerStyle={{marginTop: 20}} success onPress={this.checkRegistrationCode} text={I18n.t('registerVerification.verify')} />
					<MyLink onPress={() => this.props.route.params.requestRegistrationCode(false)} text={I18n.t('registerVerification.sendAgain')} containerStyle={{alignSelf:'center', marginTop: '5%'}} textStyle={{color:'red'}} />
					<Text style={styles.bottomText}>{I18n.t('registerVerification.pleaseWait')}</Text>
				</Content>
			</Container>
		);
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
	subTitle: {
		marginTop: '20%',
		marginBottom: '15%',
		color: 'gray',
		fontSize: 22,
		textAlign: 'center'
	},
	bottomText: {
		color: 'gray',
		fontSize: 16,
		textAlign: 'center',
		marginTop: '7%'
	}
});

export default
connect(state => ({ user: state.user }),
	dispatch => ({
		checkRegistrationCode: (data) => dispatch(userActions.checkRegistrationCode(data))
	})
)(UserRegistrationCode);