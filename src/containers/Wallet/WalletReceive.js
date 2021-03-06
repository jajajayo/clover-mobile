import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Clipboard } from 'react-native';
import { Container, Content, Footer, Thumbnail } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'
import Config from 'react-native-config'
import Toast from '../../helpers/Toast'

import { validate } from './Validate'
import { transactionActions } from '../../../src/redux/transaction/actions'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
//import { TouchableOpacity } from 'react-native-gesture-handler';

class WalletReceive extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCryptocoin: this.props.route.params?.selectedCryptocoin,
			amount: '',
			walletReceive: this.props.route.params?.selectedCryptocoin.wallet,
		}
	}

	async componentDidMount() {}

	/*fetchCopiedText = async () => {
	   const text = await Clipboard.getString()
	}*/

	copyToClipboard = async () => {
		Clipboard.setString(this.state.selectedCryptocoin.wallet)
		Toast({title: I18n.t('wallet.copyToClipboard')}, 'success')
	}

	render() {
		const {selectedCryptocoin} = this.state
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'8%'}} padder>
					{/*<Text style={{fontSize:16,color:'gray', textAlign:'center', padding:10}}>{I18n.t('wallet.subTitleSeeder')}</Text>*/}
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Thumbnail style={{}} small source={{uri: `${Config.URI_PUBLIC}/${selectedCryptocoin.image}`}} />
						<Text style={{fontSize:26, marginLeft:10}}>{`${selectedCryptocoin.name} (${selectedCryptocoin.shortName})`}</Text>
					</View>
					<View style={{width:'90%', flex:1, alignItems:'center', padding:20, borderWidth:1, borderColor:'gray', borderRadius:12, marginTop:30, alignSelf:'center'}}>
						<Thumbnail source={require('../../assets/qr-test.png')} style={{width:200, height:200}} />
						<Text style={{fontSize:16, textAlign:'center', color: '#666666'}}>{`${selectedCryptocoin.wallet}`}</Text>
					</View>

					<Text style={{fontSize:16, textAlign:'center', marginTop: 50, color: '#666666'}}>
						{I18n.t('wallet.sendOnly') + ' '}
						<Text style={{fontWeight:'bold', fontSize: 17}}>{selectedCryptocoin.name + ' '}</Text>
						{I18n.t('wallet.toThisAddress')}
					</Text>
				</Content>
				<Footer style={{backgroundColor:'white', height:100}}>
					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
						<View style={{alignItems:'center', justifyContent:'center', width: '40%'}}>
							<TouchableOpacity onPress={this.copyToClipboard}>
								<Icon name='copy' size={30} color={'#49CC68'} style={{}} />
								<Text style={{color: '#666666'}}>{I18n.t('copy')}</Text>
							</TouchableOpacity>
						</View>
						<View style={{alignItems:'center', width: '40%'}}>
							<Icon name='share' size={30} color={'#49CC68'} style={{}} />
							<Text style={{color: '#666666'}}>{I18n.t('share')}</Text>
						</View>
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
)(WalletReceive);