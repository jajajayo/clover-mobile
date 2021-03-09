import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Container, View } from 'native-base';
import { connect } from 'react-redux'

import { userActions } from '../redux/user/actions'
import { countryActions } from '../redux/country/actions'
import { transactionActions } from '../redux/transaction/actions'
import AppNavigator from '../AppNavigator';

class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNavigation: false,
			initialRoute: null
		};
	}

	async componentDidMount() {
		await this.props.getLocalData()
		await this.props.getListCountries()
		//await this.props.getListTransactions()
		if (this.props.user.localData) {
			this.setState({
				showNavigation: true,
				initialRoute: 'Dashboard'
			})
		} else {
			this.setState({
				showNavigation: true,
				initialRoute: 'Login'
			})
		}
	}

	/*getToken = async () => {
		const fcmToken = await firebase.messaging().getToken();
		if (fcmToken) {
			console.log('token', fcmToken)
		}
	};

	requestPermission = async () =>
		firebase
			.messaging()
			.requestPermission()
			.then(() => {
				getToken();
			})
			.catch(error => {
				console.warn(`${error} permission rejected`);
			});


	checkPermission = async () => {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			await this.getToken();
		} else {
			await this.requestPermission();
		}
	};

	notificationListener = async () => {
		firebase.notifications().onNotification(notification => {
			const {
				notifications: {
					Android: {
						Priority: { Max }
					}
				}
			} = firebase;
			notification.android.setChannelId(CHANNEL_NOTIFICATIONS.CHANNEL_ID);
			notification.android.setPriority(Max);
			notification.setData(notification.data);
			firebase.notifications().displayNotification(notification);
		});
	}*/

	render() {
		return (
			<Container style={ styles.Container}>
				{(!this.state.showNavigation) ? 
					<View style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
						{/*<View style={{alignItems:'center'}}>
							<Image source={require('./assets/logo.png')} style={styles.picture}/> 
						</View>*/}
						<View>
							<ActivityIndicator size="large" color="#1E85EB" />
						</View>
					</View>
					:
					<AppNavigator initialRoute={this.state.initialRoute} />
				}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	picture:{
		height: 150,
		resizeMode: 'contain'
	},
})

export default 
	connect(state => ({
		user: state.user,
		country: state.country
	}),
	dispatch => ({
		getLocalData:() => dispatch(userActions.getLocalData()),
		getListCountries: () => dispatch(countryActions.list()),
		getListTransactions: (data) => dispatch(transactionActions.list(data))
	})
)(SplashScreen);