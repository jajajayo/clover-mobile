import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { validate } from './Validate'
import { contactActions } from '../../../src/redux/contact/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'

class ContactEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: null,
		}
		this.showToast = this.props.showToast
	}

	cancel = () => {
		this.props.cancel()
	}

	updateContact = async () => {
		if (this.state.email.toLowerCase() != this.props.selected.idContact.email.toLowerCase()) {
			const sendData = { email: this.state.email }
			const errors = validate(sendData, this.showToast)
			if (errors.length == 0) {
				await this.props.updateContact({
					_id: this.props.selected._id,
					...sendData
				})
				
				if (this.props.contact.payload.success) {
					this.props.updateItem2List(this.props.contact.payload.data, this.props.selected.index)
					this.props.cancel(false)
				}
			}
		} else {
			this.showToast({ title: I18n.t('contact.selectDiferentEmail') }, 'danger')
		}
	}

	render() {
		const contact = this.props.selected.idContact
		return (
			<View style={{padding: 40, paddingBottom:0}}>
				<Text style={{fontSize:22, color:'gray'}}>{I18n.t('contact.edit')}</Text>
				<MyTextInput onChangeText={(v) => this.setState({ email:v })} placeholder={I18n.t('email')}keyboardType={'email-address'} containerStyle={{marginTop:20}} />

				<Text style={{fontSize:24, marginTop:10, marginBottom:10}}>{contact.name + ' ' + contact.lastName}</Text>

				<Text style={styles.textContactInfo}>{contact.numberPhone}</Text>
				<Text style={{...styles.textContactInfo, marginTop: 5}}>{contact.country}</Text>
				<View style={{flexDirection:'row', marginTop: 20, justifyContent:'center'}}>
					<MyButton bordered containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.cancel} text={I18n.t('cancel')} />
					<MyButton containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.updateContact} text={I18n.t('save')} />
				</View>
			</View>
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
		updateContact: (data) => dispatch(contactActions.update(data))
	})
)(ContactEdit);