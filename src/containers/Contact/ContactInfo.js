import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

import { contactActions } from '../../../src/redux/contact/actions'

class ContactInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		const contact = this.props.contact.idContact
		return (
			<>
				<View style={styles.modalHeader}>
					<View style={{width:'15%'}}>
						{contact.image != undefined && contact.image ? 
								<Image source={contact.image} style={styles.avatar} />
							:
								<View style={styles.nameAvatar}>
									<Text style={styles.textAvatar}>{(contact.name) ? contact.name.charAt(0).toUpperCase() : ''}</Text>
								</View>
						}
					</View>
					<View style={{width:'70%', alignItems:'center'}}>
						<Text style={{fontSize: 22}}>{contact.name + ' ' + contact.lastName}</Text>
					</View>
					<View style={{width:'15%', flexDirection:'row', justifyContent:'flex-end'}}>
						<TouchableOpacity onPress={() => this.props.showEdit()} >
							<Icon name='edit-2' color='green' size={30} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.showDelete()} >
							<Icon name='trash' color='green' size={30} style={{marginLeft:10}} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.modalContent}>
					<Text style={{fontSize:22}}>{I18n.t('contact.contactDetails')}</Text>
					<View style={{...styles.viewContactInfo, marginTop: 30, }}>
						<Icon name='mail' color='green' size={30} />
						<Text style={styles.textContactInfo}>{contact.name + ' ' + contact.lastName}</Text>
					</View>
					<View style={styles.viewContactInfo}>
						<Icon name='phone' color='green' size={30} />
						<Text style={styles.textContactInfo}>{contact.numberPhone}</Text>
					</View>
					<View style={styles.viewContactInfo}>
						<Icon name='flag' color='green' size={30} />
						<Text style={styles.textContactInfo}>{contact.country}</Text>
					</View>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	avatar: {
		width: 65,
		height: 65,
		borderRadius: 65,
		alignItems: 'center',
		justifyContent: 'center'
	},
	nameAvatar: {
		backgroundColor: '#7bd8dd',
		width: 65,
		height: 65,
		borderRadius: 65,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textAvatar: {
		fontSize: 50,
		color: 'white'
	},
	modalHeader: {
		width:'100%', 
		flexDirection:'row', 
		alignItems:'center', 
		justifyContent:'center', 
		padding:30, 
		borderBottomWidth:1, 
		borderColor:'lightgray'
	},
	modalContent: {
		marginTop: 15,
		marginLeft: '10%'
	},
	viewContactInfo: {
		flexDirection: 'row', 
		alignItems: 'center',
		marginTop: 10
	},
	textContactInfo: {
		fontSize: 18, 
		marginLeft: 5,
		color: 'gray'
	}
});

export default ContactInfo;