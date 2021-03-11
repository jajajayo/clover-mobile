import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
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

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			lastName: '',
			numberPhone: '',
			idCountry: '',
			email: '',
			referredUser: '',
			password: '',
			countries: (this.props.country.payload) ? this.props.country.payload.data : [],
			idCountry: '',
			cca2: 'US',
			showModal: false
		}
		this.onPressFlag = this.onPressFlag.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
		this.showToast = this.props.route.params.showToast
	}

	componentDidMount() {
		this.setState({
			pickerData: this.phone.getPickerData(),
		});
	}

	create = async () => {
		const sendData = {
			name: this.state.name,
			lastName: this.state.lastName,
			email: this.state.email,
			idCountry: this.state.idCountry,
			numberPhone: this.state.numberPhone,
			password: this.state.password
		}
		const errors = validate(sendData)
		if (errors.length == 0) {
			await this.props.create(sendData)
			
			if (this.props.user.payload.success) {
				this.props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
			}
		}
	}

	requestRegistrationCode = async (open = true) => {
		await this.setState({ numberPhone: this.phone.getValue() })
		const sendData = {
			name: this.state.name,
			lastName: this.state.lastName,
			email: this.state.email,
			numberPhone: this.state.numberPhone,
			idCountry: this.state.idCountry,
			referredUser: this.state.referredUser,
			password: this.state.password
		}
		const errors = validate(sendData, this.showToast)
		if (errors.length == 0) {
			await this.props.requestRegistrationCode({
				email: this.state.email,
				numberPhone: this.state.numberPhone
			})
			if (this.props.user.payload.success) {
				if (open) {
					this.props.navigation.navigate('UserRegistrationCode', {
						numberPhone: this.state.numberPhone,
						create: this.create,
						requestRegistrationCode: this.requestRegistrationCode
					})
				} else {
					this.showToast({ title: I18n.t('registerVerification.resendCodeMsg') }, 'success')
				}
			}
		}
	}

	showUserCodeRegistration = (value) => {
		this.setState({ 
			showUserCodeRegistration: value 
		})
	}

	setCountry = (idCountry) => {
		this.setState({ idCountry: idCountry })
	}

	setPhone = (ref) => this.phone = ref;
	getPhone = () => this.phone;

	onPressFlag() {
		this.setState({showModal: true})
	}

	selectCountry(country) {
		this.phone.selectCountry(country.cca2.toLowerCase());
		this.setState({ cca2: country.cca2, showModal: false });
	}

	render() {
		return (
			<Container>
				<Content padder contentContainerStyle={{paddingTop:'5%'}}>
					
					<MyTextInput onChangeText={(v) => this.setState({ name:v })} placeholder={I18n.t('name')} />
					<MyTextInput onChangeText={(v) => this.setState({ lastName:v })} placeholder={I18n.t('lastName')} />
					<MyTextInput onChangeText={(v) => this.setState({ email:v })} placeholder={I18n.t('email')}keyboardType={'email-address'} />

					<MyPicker values={this.state.countries} keyLabel='_id' keyValue='name' callback={this.setCountry} selectedValue={this.state.idCountry} />

					<MyPhoneInput setPhone={this.setPhone} getPhone={this.getPhone} value={this.state.numberPhone} />

					<MyTextInput onChangeText={(v) => this.setState({ referredUser:v })} placeholder={I18n.t('register.referredUser')} />
					<MyTextInput onChangeText={(v) => this.setState({ password:v })} placeholder={I18n.t('password')} secureTextEntry autoCorrect={false} />

					<View style={{flexDirection:'row', marginTop:30, alignSelf:'center'}}>
						<Image style={{...styles.social, marginRight:10}} source={require('../../assets/facebook.png')} />
						<Image style={{...styles.social, marginLeft:10}} source={require('../../assets/google.jpg')} />
					</View>

					<MyButton containerStyle={{marginTop: 20}} success onPress={this.requestRegistrationCode} text={I18n.t('register.register')} />
					<MyLink onPress={() => this.props.navigation.goBack()} text={I18n.t('cancel')} containerStyle={{marginTop: 5, alignSelf:'center'}} />

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
	buttonLogin: {
		marginTop: 50,
		borderRadius: 10,
		width:'50%'
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
	},
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
		alignItems:'center'
	},
	social: { 
		height: 50, 
		width: 50, 
		resizeMode: 'contain',
		borderRadius: 50
	},
});

export default
connect(state => ({ user: state.user, country: state.country }),
	dispatch => ({
		create: (data) => dispatch(userActions.create(data)),
		requestRegistrationCode: (data) => dispatch(userActions.requestRegistrationCode(data))
	})
)(Register);