import React, { Component } from 'react';
import { Image } from 'react-native'
import { Toast } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFE from 'react-native-vector-icons/Feather'
import IconFA from 'react-native-vector-icons/FontAwesome'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import {I18n} from 'react-redux-i18n'

import UnderConstruction from './containers/UnderConstruction'
import Wallet from './containers/Wallet/Wallet'
import Contact from './containers/Contact/Contact'
import Activity from './containers/Activity/Activity'
import Options from './containers/Options/Options'

const Tab = createBottomTabNavigator();

class TabNavigator extends Component {
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
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						const styles = {width:20, height:20, resizeMode:'contain'}
						if (route.name === 'Home') {
							if (focused) {
								return <Image source={require('./assets/icons/home2.png')} style={styles} />
							} else {
								return <Image source={require('./assets/icons/home.png')} style={styles} />
							}
							//return <IconFA name='home' size={20} color={color} style={{marginTop:3}} />;
						} else if (route.name === 'Options') {
							if (focused) {
								return <Image source={require('./assets/icons/opciones2.png')} style={styles} />
							} else {
								return <Image source={require('./assets/icons/opciones.png')} style={styles} />
							}
							//return <IconFE name='settings' size={20} color={color} style={{marginTop:3}} />;
						} else if (route.name === 'Contacts') {
							if (focused) {
								return <Image source={require('./assets/icons/contactos2.png')} style={styles} />
							} else {
								return <Image source={require('./assets/icons/contactos.png')} style={styles} />
							}
							//return <IconFA name='address-book-o' size={20} color={color} style={{marginTop:3}} />;
						} else if (route.name === 'Activity') {
							if (focused) {
								return <Image source={require('./assets/icons/actividad2.png')} style={styles} />
							} else {
								return <Image source={require('./assets/icons/actividad.png')} style={styles} />
							}
							//return <IconFE name='bar-chart' size={20} color={color} style={{marginTop:3}} />;
						} else if (route.name === 'Transfer') {
							if (focused) {
								return <Image source={require('./assets/icons/home2.png')} style={styles} />
							} else {
								return <Image source={require('./assets/icons/home.png')} style={styles} />
							}
							//return <IconFE name='list' size={20} color={color} style={{marginTop:3}} />;
						}
					}
				})}
				tabBarOptions={{
					activeTintColor: '#49CC68',
					inactiveTintColor: 'gray',
					//inactiveBackgroundColor: '#0C6393',
					//activeBackgroundColor: '#1E85EB',
					showLabel: true,
					labelStyle: {
						fontSize: 11, 
						marginBottom: 5
					}
				}}
			>
				<Tab.Screen name="Home" component={Wallet} options={{title: I18n.t('tab.home')}} initialParams={{showToast: this.showToast}} />
				<Tab.Screen name="Contacts" component={Contact} options={{title: I18n.t('tab.contacts')}} initialParams={{showToast: this.showToast}}/>
				<Tab.Screen name="Activity" component={Activity} options={{title: I18n.t('tab.activity')}} />
				{/*<Tab.Screen name="Transfer" component={UnderConstruction} options={{title: I18n.t('tab.transfer')}} />*/}
				<Tab.Screen name="Options" component={Options} options={{title: I18n.t('tab.options')}} />
			</Tab.Navigator>
		)
	}
}

export default TabNavigator;