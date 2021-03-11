import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {I18n} from 'react-redux-i18n'
import CountryPicker from 'react-native-country-picker-modal';

class MyPhoneInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cca2: 'US',
			showModal: false
		}
		this.onPressFlag = this.onPressFlag.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
	}

	setCountry = (idCountry) => {
		this.setState({ idCountry: idCountry })
	}

	setPhone = (ref) => this.phone = ref;

	onPressFlag() {
		this.setState({showModal: true})
		//this.countryPicker.openModal();
	}

	selectCountry(country) {
		this.props.getPhone().selectCountry(country.cca2.toLowerCase());
		this.setState({ cca2: country.cca2, showModal: false });
	}

	render() {
		return (
			<View style={styles.container}>
				<PhoneInput ref={ref => { (this.props?.setPhone) ? this.props.setPhone(ref) : null }} {...this.props} onPressFlag={this.onPressFlag} />
				<CountryPicker
						ref={(ref) => {
							this.countryPicker = ref;
						}}
						onSelect={value => this.selectCountry(value)}
						translation="eng"
						cca2={this.state.cca2}
						visible={this.state.showModal}
						onClose={() => this.setState({showModal: false})}
						containerButtonStyle={{display:'none'}}
						withFilter
						withAlphaFilter
					>
					<View />
				</CountryPicker>
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