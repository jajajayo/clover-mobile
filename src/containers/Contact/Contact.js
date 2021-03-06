import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
			contactsFiltered: [],
			selected: null,
			showModal: false,
			showInfo: false,
			showDelete: false,
			showEdit: false,
			showAdd: false,
			search: '',
			loaded: false
		}
		this.showToast = this.props.route.params.showToast
	}

	async componentDidMount() {
		await this.props.listContacts()
		if (this.props.contact.payload.success) {
			this.setState({ 
				contacts: (this.props.contact.payload.data) ? this.props.contact.payload.data : [],
				loaded: true
			})
		}
	}

	selectContact = (contact, index) => {
		this.setState({
			selected: contact,
			index: index,
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

	addItem2List = (contact) => {
		let stateContacts = this.state.contacts
		stateContacts.push(contact)
		stateContacts = this.sort(stateContacts)
		this.setState({ contacts: stateContacts })
	}

	updateItem2List = (contact, i) => {
		let stateContacts = this.state.contacts
		stateContacts.splice(i, 1)
		stateContacts.push(contact)
		stateContacts = this.sort(stateContacts)
		this.setState({ contacts: stateContacts })
	}

	removeItem4List = (i) => {
		let stateContacts = this.state.contacts
		stateContacts.splice(i, 1)
		this.setState({ contacts: stateContacts })
	}

	sort(contacts) {
		contacts.sort(function(a, b){
			if(a.idContact.name < b.idContact.name) { return -1; }
			if(a.idContact.name > b.idContact.name) { return 1; }
			return 0;
		})
		return contacts
	}

	filterContacts(query) {
		this.setState({search: query})
		let contacts = this.state.contacts
		contacts = contacts.filter((contact) => {
			const name = contact.idContact.name + ' ' + contact.idContact.lastName
			return name.toLowerCase().indexOf(query.toLowerCase()) > -1
		});
		this.setState({contactsFiltered: contacts})
	}

	render() {
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'10%'}}>

					<View style={{padding:20}}>
						<MyTextInput onChangeText={(v) => this.filterContacts(v)} placeholder={I18n.t('contact.title')} icon='search'/>
					</View>

					{(this.state.loaded == true && this.state.contacts.length > 0 && this.state.search == '') &&
						this.state.contacts.map((contact, index) => (
							<CardContact 
								key={index} 
								data={contact} 
								onPress={() => this.selectContact({...contact, index: index})} 
							/>
						))
					}
					{(this.state.loaded == true && this.state.contactsFiltered.length > 0 && this.state.search != '') &&
						this.state.contactsFiltered.map((contact, index) => (
							<CardContact 
								key={index} 
								data={contact} 
								onPress={() => this.selectContact({...contact, index: index})} 
							/>
						))
					}
					{(this.state.loaded == true && this.state.contacts.length > 0 && this.state.contactsFiltered.length == 0 && this.state.search != '') &&
						<View style={{alignItems:'center', justifyContent:'center', marginTop: '10%'}}>
							<Text style={{fontSize: 20, textAlign:'center', color:'gray'}}>{I18n.t('contact.notFound')}</Text>
						</View>
					}
					{(this.state.loaded == true && this.state.contacts.length == 0) &&
						<View style={{alignItems:'center', justifyContent:'center', marginTop: '50%'}}>
							<Text style={{fontSize: 30, textAlign:'center', color:'gray'}}>{I18n.t('contact.unregisteredContacts')}</Text>
						</View>
					}

					<Modal isVisible={this.state.showModal} style={styles.modal} backdropOpacity={0.10} onBackdropPress={() => this.setState({showModal: false})}>
						<View style={{...styles.modalContainer}}>
						<View style={styles.modalTop}></View>
							{(this.state.selected && this.state.showInfo) &&
								<ContactInfo contact={this.state.selected} showEdit={this.showEdit} showDelete={this.showDelete} />
							}
							{(this.state.selected && this.state.showEdit) &&
								<ContactEdit selected={this.state.selected} updateItem2List={this.updateItem2List} cancel={this.cancel} showToast={this.showToast} />
							}
							{this.state.showAdd &&
								<ContactAdd cancel={this.cancel} addItem2List={this.addItem2List} showToast={this.showToast} />
							}
							{(this.state.selected && this.state.showDelete) &&
								<ContactDelete selected={this.state.selected} removeItem4List={this.removeItem4List} cancel={this.cancel} showToast={this.showToast} />
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
		borderColor: '#49CC68', 
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