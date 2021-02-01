import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { validate } from './Validate'
import { contactActions } from '../../../src/redux/contact/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
import { ScrollView } from 'react-native-gesture-handler';

class ContactAdd extends Component {
	constructor(props) {
		super(props);
		//console.log(this.props)
		this.state = {
			email: ''
		}
	}

	create = async () => {
		const sendData = { email: this.state.email }
		const errors = validate(sendData)
		if (errors.length == 0) {
			await this.props.create(sendData)
			
			if (this.props.contact.payload.success) {
				this.props.addItem2List(this.props.contact.payload.data)
				this.props.cancel(false)
			}
		}
	}

	cancel = () => {
		this.props.cancel(false)
	}

	setCountry = (idCountry) => {
		this.setState({ idCountry: idCountry })
	}

	setPhone = (ref) => this.phone = ref;

	render() {
		return (
			<ScrollView keyboardShouldPersistTaps='always'>
				<View style={{padding: 40, paddingBottom:0}}>
					<Text style={{fontSize:22, color:'gray'}}>{I18n.t('contact.add')}</Text>

					<MyTextInput onChangeText={(v) => this.setState({ email:v })} placeholder={I18n.t('email')}keyboardType={'email-address'} containerStyle={{marginTop:30}} />

					<View style={{flexDirection:'row', marginTop: 20, justifyContent:'center'}}>
						<MyButton bordered containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.cancel} text={I18n.t('cancel')} />
						<MyButton containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.create} text={I18n.t('save')} />
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	textContactInfo: {
		fontSize: 18, 
		marginLeft: 5,
		color: 'gray'
	}
});

export default
connect(state => ({ contact: state.contact }),
	dispatch => ({
		create: (data) => dispatch(contactActions.create(data))
	})
)(ContactAdd);