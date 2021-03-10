import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

import { cryptocoinActions } from '../../../src/redux/cryptocoin/actions'
import { userActions } from '../../../src/redux/user/actions'
import { walletActions } from '../../../src/redux/wallet/actions'
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
			cryptocoins: [],
			userCryptocoins: [],
			wallet: []
		}
		this.showToast = this.props.route.params.showToast
	}

	async componentDidMount() {
		await this.props.getListCryptocoins()
		await this.props.listWallet()
		await this.props.getListTransactions()
		
		if (this.props.cryptocoin.payload.success) {
			this.setWallet()
		}
	}

	walletSelect = (typeOperation) => {
		this.props.navigation.navigate('WalletSelect', {
			cryptocoins: this.state.cryptocoins,
			setNewWallet: this.setNewWallet,
			typeOperation: typeOperation
		})
	}

	setWallet = async (cryptoRedux = true) => {
		let cryptocoins = (cryptoRedux) ? this.props.cryptocoin.payload?.data : this.state.cryptocoins
		let userCryptocoins =  this.props.user?.localData?.cryptocoins
		if (cryptocoins && cryptocoins?.length) {
			if (userCryptocoins && userCryptocoins?.length) {
				cryptocoins.map(cryptocoin => {
					const ifExists = userCryptocoins.find(ele => ele.idCryptocoin == cryptocoin._id)
					if (ifExists) {
						cryptocoin.walletUser = ifExists.wallet
						cryptocoin.amount = ifExists.amount
					}
				})
			}
		}
		this.setState({
			cryptocoins: cryptocoins
		})
	}

	setNewWallet = async () => {
		await this.props.getLocalData()
		this.setWallet(false)
	}

	render() {
		const wallet = (this.props.wallet.payload?.success) ? this.props.wallet.payload?.data : []
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'10%'}}>

					<View style={{width:'100%', flexDirection:'row'}}>
						<View style={{width:'50%', alignItems:'center'}}>
							<TouchableOpacity style={styles.arrow} onPress={() => this.walletSelect('send')}>
								<Icon name='arrow-up' size={70} color='white' />
							</TouchableOpacity>
							<Text style={{fontSize:20}}>{I18n.t('wallet.send')}</Text>
						</View>
						<View style={{width:'50%', alignItems:'center'}}>
							<TouchableOpacity style={styles.arrow} onPress={() => this.walletSelect('receive')}>
								<Icon name='arrow-down' size={70} color='white' />
							</TouchableOpacity>
							<Text style={{fontSize:20}}>{I18n.t('wallet.receive')}</Text>
						</View>
					</View>

					<Text style={{fontSize:36, padding:10, textAlign:'center', paddingTop:0}}>${'0.00'}</Text>
					<Text style={{fontSize:24, color:'gray', padding:10, marginLeft:10}}>{I18n.t('wallet.title')}</Text>

					<ListCard icon='plus' iconColor='#49CC68' title={I18n.t('wallet.addWallet')} onPress={() => this.walletSelect('addWallet')} />
					{wallet && wallet?.length > 0 &&
						wallet.map((cryptocoin, index) => {
							return <CardWallet key={index} data={cryptocoin} />
						})
					}
				</Content>
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
	},
	arrow: {
		backgroundColor: '#49CC68',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 90,
		width: 90,
		height: 90
	},
	addWallet: {
		borderRadius: 6,
		backgroundColor: '#49CC68',
		padding: 10,
		alignSelf:'flex-end',
		flexDirection:'row',
		alignItems: 'center'
	}
});

export default
connect(state => ({ user: state.user, cryptocoin: state.cryptocoin, balance: state.balance, wallet: state.wallet, transaction: state.transaction }),
	dispatch => ({
		getListCryptocoins: () => dispatch(cryptocoinActions.list()),
		getLocalData: () => dispatch(userActions.getLocalData()),
		listWallet: () => dispatch(walletActions.listWallet()),
		getListTransactions: (data) => dispatch(transactionActions.list(data))
	})
)(Wallet);