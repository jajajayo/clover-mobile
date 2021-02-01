import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

import { contactActions } from '../../../src/redux/contact/actions'
import MyButton from '../../components/MyButton'

class ContactDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: null,
		}
	}

	deleteContact = async () => {
		console.log(this.props.selected)
		await this.props.deleteContact({ _id: this.props.selected._id })
		if (this.props.contact.payload.success) {
			this.props.removeItem4List(this.props.selected.index)
			this.cancel(false)
		}
	}

	cancel = (showModal = true) => {
		this.props.cancel(showModal)
	}

	render() {
		const contact = this.props.contact
		return (
			<View style={{marginTop: 15, alignItems:'center', padding:20}}>
				<Text style={{fontSize:28, marginTop: 20}}>{I18n.t('contact.delete')}</Text>
				<Icon name='trash' color='green' size={40} style={{marginTop: 20}} />
				<View style={{flexDirection:'row', marginTop: 20}}>
					<MyButton bordered containerStyle={{width:'40%', marginRight:'3%'}} success onPress={this.cancel} text={I18n.t('cancel')} />
					<MyButton containerStyle={{width:'40%', marginRight:'3%'}} success onPress={this.deleteContact} text={I18n.t('delete')} />
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
		deleteContact: (data) => dispatch(contactActions.delete(data))
	})
)(ContactDelete);