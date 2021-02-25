import React, { Component } from 'react';
import { Toast } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux'
import {I18n} from 'react-redux-i18n'

import TabNavigator from './TabNavigator'
import Login from './containers/Login/Login'
import UserRegister from './containers/User/UserRegister'
import UserRegistrationCode from './containers/User/UserRegistrationCode'
import UserUpdate from './containers/User/UserUpdate'
import LoadingModal from './components/LoadingModal'
import WalletSeeder from './containers/Wallet/WalletSeeder'

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
		
		return (
			<>
				{(user || cryptocoin || contact) &&
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
		contact: state.contact
	}))(AppNavigator)