import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'

import { validate } from './Validate'
import { userActions } from '../../../src/redux/user/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
import MyLink from '../../components/MyLink'
import { TouchableOpacity } from 'react-native-gesture-handler';

GoogleSignin.configure({
	webClientId: '553674416626-id40uoc9lv181bsb25n13d6ra2ann1t5.apps.googleusercontent.com',
	offlineAccess: true
})

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.showToast = this.props.route.params.showToast
	}

	loginUser = async () => {
		const sendData = {
			email: this.state.email,
			password: this.state.password
		}
		const errors = validate(sendData)
		if (errors.length == 0) {
			await this.props.login({
				email: this.state.email,
				password: this.state.password
			})
			
			if (this.props.user.payload.success) {
				//this.showToast({ title: 'Bienvenid@\nHa iniciado sesión correctamente' }, 'success')
				this.props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
			} else {
				//this.showToast({ title: 'Usuario o contraseña incorrecta' }, 'danger')
			}
		}
	}

	signInGoogle = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			console.log('pasamos')
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo)
			/*await this.props.signInSocial({
				email: userInfo.user.email,
				idgoogle: userInfo.user.id,
				social:'google',
				device_info: this.state.deviceInfo
			})
			if(this.props.user.payload.success){
				errorAlert('LOGIN_SUCCESS')
				const resetAction = await StackActions.reset({
					index: 0,
					actions: [ NavigationActions.navigate({routeName: 'Dialer'}) ]
				})
				await this.props.navigation.dispatch(resetAction)
			}else{
				if(this.props.user.payload.message == 'USER_NOT_EXISTS'){
					//console.log(userInfo.user)
					this.props.navigation.navigate('RegisterStepOne', {
						firstName: userInfo.user.givenName, 
						lastName: userInfo.user.familyName,
						email: userInfo.user.email,
						idGoogle: userInfo.user.id,
						deviceInfo: this.state.deviceInfo
					})
				}else{
					errorAlert(this.props.user.payload.message)
				}
			}
			*/
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
	      // user cancelled the login flow
				console.log("1",error)
			} else if (error.code === statusCodes.IN_PROGRESS) {
	      // operation (e.g. sign in) is in progress already
				console.log("2",error)
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
	      // play services not available or outdated
				console.log("3",error)
			} else {
	      // some other error happened
				console.log("4",error)
			}
		}
	}

	render() {
		return (
			<Container>
				<Content padder contentContainerStyle={{alignSelf:'center', alignItems:'center', width:'80%'}}>
					<Text style={styles.title}>{I18n.t('login.title')}</Text>
					
					<MyTextInput onChangeText={(email) => this.setState({ email })} keyboardType={'email-address'} autoCapitalize={'none'} placeholder={I18n.t('email')} />
					<MyTextInput onChangeText={(password) => this.setState({ password })} placeholder={I18n.t('password')} />

					<MyButton containerStyle={{marginTop: 20}} success onPress={this.loginUser} text={I18n.t('login.title')} />

					<View style={{flexDirection:'row', marginTop:30}}>
						<TouchableOpacity>
							<Image style={{...styles.social, marginRight:10}} source={require('../../assets/facebook.png')} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.signInGoogle()}>
							<Image style={{...styles.social, marginLeft:10}} source={require('../../assets/google.jpg')} />
						</TouchableOpacity>
					</View>

					<MyLink onPress={() => this.props.navigation.navigate('UserRegister')} text={I18n.t('login.signUp')} containerStyle={{marginTop: 50}} />
					<MyLink text={I18n.t('login.forgotMyPassword')} containerStyle={{marginTop: 5}} />
				</Content>
			</Container>
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
	},
	social: { 
		height: 50, 
		width: 50, 
		resizeMode: 'contain',
		borderRadius: 50
	},
});

export default
	connect(state => ({ user: state.user }),
		dispatch => ({
			login: (data) => dispatch(userActions.login(data))
		})
	)(Login);