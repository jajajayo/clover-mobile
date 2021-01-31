import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {I18n} from 'react-redux-i18n'

class MyPhoneInput extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<View style={styles.container}>
				<PhoneInput ref={ref => { (this.props?.setPhone) ? this.props.setPhone(ref) : null }} {...this.props} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
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

export default MyPhoneInput