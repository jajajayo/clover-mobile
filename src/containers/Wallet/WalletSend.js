import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Footer, Thumbnail } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'
import Toast from '../../helpers/Toast'

import { validate } from './Validate'
import { transactionActions } from '../../../src/redux/transaction/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
//import { TouchableOpacity } from 'react-native-gesture-handler';

class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCryptocoin: this.props.route.params?.selectedCryptocoin,
			amount: '',
			walletReceive: ''
		}
	}

	async componentDidMount() {}

	send = async () => {
		const sendData = {
			amount: Number(this.state.amount),
			walletReceive: this.state.walletReceive
		}
		const errors = validate(sendData)
		if (errors.length == 0) {
			await this.props.send({
				...sendData,
				idCryptocoin: this.state.selectedCryptocoin._id,
				wallet: this.state.selectedCryptocoin.walletUser
			})
			if (this.props.transaction.payload.success) {
				this.props.navigation.popToTop()
			}
		}
	}

	render() {
		const {selectedCryptocoin} = this.state
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'8%'}} padder>
					{/*<Text style={{fontSize:16,color:'gray', textAlign:'center', padding:10}}>{I18n.t('wallet.subTitleSeeder')}</Text>*/}
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Thumbnail style={{}} small source={{uri: 'http://192.168.1.20:4007/public/'+selectedCryptocoin.image}} />
						<Text style={{fontSize:26, marginLeft:10}}>{`${selectedCryptocoin.name} (${selectedCryptocoin.shortName})`}</Text>
					</View>
					<Text style={{marginTop:20}}>{selectedCryptocoin.walletUser}</Text>
					<MyTextInput onChangeText={(walletReceive) => this.setState({ walletReceive })} placeholder={I18n.t('wallet.addressee')} containerStyle={{marginTop:30}} />
					<MyTextInput onChangeText={(amount) => this.setState({ amount })} placeholder={I18n.t('wallet.amount')} containerStyle={{marginTop:20}} />
				</Content>
				<Footer style={{backgroundColor:'white', height:100}}>
					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
						<MyButton containerStyle={{width:'95%', padding:5 }} primary onPress={() => this.send()} text={I18n.t('continue').toUpperCase()} />
					</View>
				</Footer>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	transactions: {
		borderRadius:8, 
		flexDirection:'row',
		padding:10
	},
	btnSection: {
		alignSelf: 'center',
		flexDirection: 'row', 
		width: '90%', 
		flexWrap: 'wrap', 
		justifyContent: 'center', 
		marginTop: '10%'
	},
	copyBtn: {
		alignSelf: 'center', 
		flexDirection: 'row', 
		marginTop:'10%'
	},
	info: {
		backgroundColor: '#EFEFEF', 
		alignSelf: 'center', 
		marginTop: '10%', 
		padding: 15, 
		alignItems: 'center', 
		width: '90%',
		borderRadius: 8
	}
});

export default
connect(state => ({ user: state.user, transaction: state.transaction, cryptocoin: state.cryptocoin }),
	dispatch => ({
		send: (data) => dispatch(transactionActions.send(data))
	})
)(Wallet);