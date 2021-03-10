import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { validate } from './Validate'
import { userActions } from '../../../src/redux/user/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
import MyLink from '../../components/MyLink'
import MyPicker from '../../components/MyPicker'
import MyPhoneInput from '../../components/MyPhoneInput'

class UserUpdate extends Component {
	constructor(props) {
		super(props);
		const user = (this.props.user?.localData) ? this.props.user.localData : null
		this.state = {
			_id: user._id || null,
			name: user.name || null,
			lastName: user.lastName || null,
			numberPhone: user.numberPhone || null,
			email: user.email || null,
			password: '',
			idCountry: user.idCountry || null,
			countries: this.props.country.payload ? this.props.country.payload.data : [],
			loaded: false
		}
	}

	update = async () => {
		await this.setState({ numberPhone: this.phone.getValue() })
		const sendData = {
			name: this.state.name,
			lastName: this.state.lastName,
			idCountry: this.state.idCountry,
			numberPhone: this.state.numberPhone,
			password: this.state.password
		}

		const required = { password: false }
		const errors = validate(sendData, required)
		if (errors.length == 0) {
			await this.props.update({
				_id: this.props.user?.localData._id,
				...sendData
			})
			
			if (this.props.user.payload.success) {
			}
		}
	}

	setCountry = (idCountry) => {
		this.setState({ idCountry: idCountry })
	}

	setPhone = (ref) => this.phone = ref;

	render() {
		return (
			<Container>
				<Content padder contentContainerStyle={{paddingTop:'5%'}}>
					
					<MyTextInput onChangeText={(v) => this.setState({ name:v })} placeholder={I18n.t('name')} defaultValue={this.state.name} />
					<MyTextInput onChangeText={(v) => this.setState({ lastName:v })} placeholder={I18n.t('lastName')} defaultValue={this.state.lastName} />
					<MyTextInput onChangeText={(v) => this.setState({ email:v })} placeholder={I18n.t('email')}keyboardType={'email-address'} defaultValue={this.state.email} editable={false} />

					<MyPicker values={this.state.countries} keyLabel='_id' keyValue='name' callback={this.setCountry} selectedValue={this.state.idCountry} />

					<MyPhoneInput setPhone={this.setPhone} value={this.state.numberPhone} />

					<MyTextInput onChangeText={(v) => this.setState({ password:v })} placeholder={I18n.t('userUpdate.newPassword')} secureTextEntry autoCorrect={false} />

					<MyButton containerStyle={{marginTop: 20}} success onPress={this.update} text={I18n.t('saveChanges')} />
					<MyLink onPress={() => this.props.navigation.goBack()} text={I18n.t('cancel')} containerStyle={{marginTop: 5, alignSelf:'center'}} />

				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	phoneInput: {
		borderWidth: 1,
		borderRadius: 30,
		borderColor: 'green',
		width:'100%', 
		paddingTop:10, 
		paddingBottom:10,
		paddingLeft: 15,
		height:50,
		marginTop: 5,
		marginBottom:5,
		alignItems:'center',
		justifyContent:'center'
	},
});

export default
connect(state => ({ user: state.user, country: state.country }),
	dispatch => ({
		update: (data) => dispatch(userActions.update(data))
	})
)(UserUpdate);