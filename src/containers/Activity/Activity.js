import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Container, Content, Button, List, ListItem } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'
import Config from 'react-native-config'
import moment from 'moment'

import { transactionActions } from '../../../src/redux/transaction/actions'
import CardWallet from '../../components/CardWallet'
import ListCard from '../../components/ListCard'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	async componentDidMount() {}

	seeDetails = (transaction) => {
		this.props.navigation.navigate('ActivityDetail', {transaction: transaction})
	}

	render() {
		const transactions = (this.props.transaction.payload?.success) ? this.props.transaction.payload?.data : []
		return (
			<Container>
				<Content padder contentContainerStyle={{paddingTop:'5%'}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}>{I18n.t('activity.title')}</Text>
					{transactions && transactions.length > 0 &&
						transactions.map((trans, index) => (
							<TouchableOpacity key={index} style={styles.containerTransaction} onPress={() => this.seeDetails(trans)}>
								<View style={{flexDirection:'row'}}>
									<View style={{flex:1, justifyContent:'center'}}>
										{trans.cryptocoin?.image &&
											<Image source={{uri: `${Config.URI_PUBLIC}/${trans.cryptocoin.image}`}} style={styles.avatar} />
										}
									</View>
									<View style={{flex:5}}>
										<View style={{flexDirection:'row', justifyContent:'space-between'}}>
											<View style={{alignSelf:'flex-start'}}>
												<Text style={{...styles.title}} >{trans.cryptocoin.name} ({trans.cryptocoin.shortName})</Text>
											</View>
											<View style={{alignSelf:'flex-end'}}>
												<Text style={{...styles.title}} >{trans.amount}</Text>
											</View>
										</View>
										<View style={{marginTop: 5}}>
											<Text style={{...styles.subtitle}}>{trans.idTransaction}</Text>
										</View>
										<View style={{marginTop: 5}}>
											<Text style={{...styles.subtitle}}>{moment(trans.createdAt).format('DD-MM-YYYY HH:mm')}</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						))
					}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	containerTransaction: {
		flex: 1,
		alignItems: 'center',
		borderTopWidth: 1,
		padding: 15,
		borderRadius: 6,
		borderColor: 'lightgray',
		height:100
	},
	avatar: {
		width: 45,
		height: 45,
		borderRadius: 45,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 18, 
		color: 'black'
	},
	subtitle: {
		fontSize: 14, 
		color: 'gray'
	}
});

export default
connect(state => ({ transaction: state.transaction }),
	dispatch => ({
	})
)(Wallet);