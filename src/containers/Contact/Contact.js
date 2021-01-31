import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'
import Modal from 'react-native-modal';

import { contactActions } from '../../../src/redux/contact/actions'
import CardContact from '../../components/CardContact'
import MyTextInput from '../../components/MyTextInput'
import ContactInfo from './ContactInfo'
import ContactAdd from './ContactAdd'
import ContactEdit from './ContactEdit'
import ContactDelete from './ContactDelete'

class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			selected: null,
			showModal: false,
			showInfo: false,
			showDelete: false,
			showEdit: false,
			showAdd: false
		}
		this.showToast = this.props.route.params.showToast
	}

	async componentDidMount() {
		await this.props.listContacts()
		if (this.props.contact.payload.success) {
			this.setState({ contacts: this.props.contact.payload.data })
		}
	}

	selectContact = (contact) => {
		this.setState({
			selected: contact,
			showModal: true,
			showInfo: true,
			showDelete: false,
			showEdit: false,
			showAdd: false
		})
	}

	showDelete = () => {
		this.setState({
			showInfo: false,
			showDelete: true,
			showEdit: false,
			showAdd: false
		})
	}

	showEdit = () => {
		this.setState({
			showInfo: false,
			showDelete: false,
			showEdit: true,
			showAdd: false
		})
	}

	showAdd = () => {
		this.setState({
			showModal: true,
			showInfo: false,
			showDelete: false,
			showEdit: false,
			showAdd: true
		})
	}

	cancel = (showModal = true) => {
		this.setState({
			showInfo: true,
			showDelete: false,
			showEdit: false,
			showAdd: false,
			showModal: showModal 
		})
	}

	render() {
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'10%'}}>

					<View style={{padding:20}}>
						<MyTextInput onChangeText={(v) => this.setState({ name:v })} placeholder={I18n.t('contact.title')} icon='search'/>
					</View>

					{(this.state.contacts && this.state.contacts.length > 0) && 
						this.state.contacts.map((contact, index) => (
						<CardContact key={index} data={contact} onPress={() => this.selectContact(contact)} />
					))}

					<Modal isVisible={this.state.showModal} style={styles.modal} backdropOpacity={0.10} onBackdropPress={() => this.setState({showModal: false})}>
						<View style={{...styles.modalContainer}}>
						<View style={styles.modalTop}></View>
							{this.state.showInfo &&
								<ContactInfo contact={this.state.selected} showEdit={this.showEdit} showDelete={this.showDelete} />
							}
							{this.state.showEdit &&
								<ContactEdit contact={this.state.selected} cancel={this.cancel} />
							}
							{this.state.showAdd &&
								<ContactAdd cancel={this.cancel} showToast={this.showToast} />
							}
							{this.state.showDelete &&
								<ContactDelete contact={this.state.selected} cancel={this.cancel} showToast={this.showToast} />
							}
						</View>
					</Modal>
				</Content>
				<Button style={styles.addButton} success onPress={this.showAdd}>
					<Icon name='plus' size={40} color='white' />
				</Button>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	addButton: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30,
		borderRadius: 70,
		width: 70,
		height: 70,
		padding: 10
	},
	modal: {
		justifyContent: 'flex-end', 
		margin: 0
	},
	modalContainer: {
		backgroundColor: 'white',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: 'lightgray',
		paddingBottom: 20
	},
	modalTop: {
		borderBottomWidth: 4, 
		borderColor: 'green', 
		marginTop: 10, 
		width:'40%', 
		alignSelf:'center'
	}
});

export default
connect(state => ({ contact: state.contact }),
	dispatch => ({
		listContacts: (data) => dispatch(contactActions.list(data))
	})
)(Contact);