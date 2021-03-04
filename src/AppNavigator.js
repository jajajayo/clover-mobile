import React, { Component } from 'react';
import { Toast } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux'
import {I18n} from 'react-redux-i18n'
import store from './redux/store'

import TabNavigator from './TabNavigator'
import Login from './containers/Login/Login'
import UserRegister from './containers/User/UserRegister'
import UserRegistrationCode from './containers/User/UserRegistrationCode'
import UserUpdate from './containers/User/UserUpdate'
import LoadingModal from './components/LoadingModal'
import WalletSeeder from './containers/Wallet/WalletSeeder'
import WalletSelect from './containers/Wallet/WalletSelect'
import WalletSend from './containers/Wallet/WalletSend'
import {io} from 'socket.io-client'
const socket = io.connect(`ws://200.93.126.98:4010`, { 'forceNew': true, 'reconnection': false });

socket.on("connect", () => {
	console.log('conectado al socket que emite el monto')
});

socket.on('update-balance', async function (data) {
	console.log('recibo: ', data)
	const wallet = store.getState().wallet?.payload?.data
	console.log('wallet', wallet)
	if (wallet?.length > 0) {
		await Promise.all(wallet.map(w => {
			if (w._id.toString() == data.idCryptocoin.toString()) {
				w.amount = parseFloat(w.amount) + parseFloat(data.amount)
			}
		}))
		store.dispatch({type:'SUCCESS_WALLET', payload: {success: true, data: wallet}})
	}
})

const Stack = createStackNavigator();

class AppNavigator extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	showToast = (props, type = 'default') => {
		Toast.show({
			text: props.title,
			buttonText: (props.buttonText) ? props.buttonText : 'Ok',
			style: {
				top: -30
			},
			type: type,
			position: 'top',
			duration: 6000
		})
	}

	render() {
		const user = this.props.user.isLoading
		const cryptocoin = this.props.cryptocoin.isLoading
		const contact = this.props.contact.isLoading
		const transaction = this.props.transaction.isLoading
		const seeder = this.props.seeder.isLoading
		const wallet = this.props.wallet.isLoading
		
		return (
			<>
				{(user || cryptocoin || contact || transaction || seeder || wallet) &&
					<LoadingModal />
				}
				<NavigationContainer screenProps={{test: this.test}}>
					<Stack.Navigator initialRouteName={this.props.initialRoute}>
						<Stack.Screen 
							name="Dashboard" 
							component={TabNavigator}
							options={{
								//headerTitle: props => <HeaderLayout {...props} />,
								//headerStyle: {}
								headerShown: false
							}} />
						<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} initialParams={{showToast: this.showToast}} />
						<Stack.Screen name="UserRegister" component={UserRegister} options={{ title: I18n.t('register.title') }} initialParams={{showToast: this.showToast}} />
						<Stack.Screen name="UserRegistrationCode" component={UserRegistrationCode} options={{ title: I18n.t('registerVerification.title') }} initialParams={{showToast: this.showToast}} />
						<Stack.Screen name="UserUpdate" component={UserUpdate} options={{ title: I18n.t('userUpdate.title') }} initialParams={{showToast: this.showToast}} />
						<Stack.Screen name="WalletSeeder" component={WalletSeeder} options={{ title: I18n.t('wallet.titleSeeder') }} initialParams={{showToast: this.showToast}} />
						<Stack.Screen name="WalletSelect" component={WalletSelect} options={{ title: I18n.t('wallet.selectACryptocoin') }} />
						<Stack.Screen name="WalletSend" component={WalletSend} options={{ title: I18n.t('send') }} />
					</Stack.Navigator>
				</NavigationContainer>
			</>
		)
	}
}

export default 
	connect(state => ({
		user: state.user,
		cryptocoin: state.cryptocoin,
		contact: state.contact,
		transaction: state.transaction,
		seeder: state.seeder,
		wallet: state.wallet
	}))(AppNavigator)