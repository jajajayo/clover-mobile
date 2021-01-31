import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'

import { userActions } from '../../../src/redux/user/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'

class ContactEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: null,
		}
	}

	cancel = () => {
		this.props.cancel()
	}

	render() {
		const contact = this.props.contact
		return (
			<View style={{padding: 40, paddingBottom:0}}>
				<Text style={{fontSize:22, color:'gray'}}>{I18n.t('contact.edit')}</Text>
				<MyTextInput onChangeText={(v) => this.setState({ email:v })} placeholder={I18n.t('email')}keyboardType={'email-address'} containerStyle={{marginTop:20}} />

				<Text style={{fontSize:24, marginTop:10, marginBottom:10}}>{contact.name + ' ' + contact.lastName}</Text>

				<Text style={styles.textContactInfo}>{contact.numberPhone}</Text>
				<Text style={{...styles.textContactInfo, marginTop: 5}}>{contact.country}</Text>
				<View style={{flexDirection:'row', marginTop: 20, justifyContent:'center'}}>
					<MyButton bordered containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.cancel} text={I18n.t('cancel')} />
					<MyButton containerStyle={{width:'43%', marginRight:'3%'}} success onPress={this.requestRegistrationCode} text={I18n.t('save')} />
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
connect(state => ({ user: state.user }),
	dispatch => ({
		create: (data) => dispatch(userActions.create(data))
	})
)(ContactEdit);