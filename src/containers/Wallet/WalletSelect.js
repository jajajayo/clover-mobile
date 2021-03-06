import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { connect } from 'react-redux'
import Config from 'react-native-config'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'
import Toast from '../../helpers/Toast'

import ListCard from '../../components/ListCard'

class WalletSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCrypto: null,

		}
	}

	selectCryptocoin = (cryptocoin) => {
		if (this.props.route.params.typeOperation == 'addWallet') {
			this.props.navigation.navigate('WalletSeeder', {
				cryptocoins: this.props.route.params.cryptocoins,
				selectedCryptocoin: cryptocoin,
				setNewWallet: this.props.route.params.setNewWallet
			})
		} else if (this.props.route.params.typeOperation == 'send') {
			this.props.navigation.navigate('WalletSend', {
				selectedCryptocoin: cryptocoin
			})
		} else if (this.props.route.params.typeOperation == 'receive') {
			this.props.navigation.navigate('WalletReceive', {
				selectedCryptocoin: cryptocoin
			})
		}
	}

	render() {
		const cryptocoins = this.props.route.params?.cryptocoins
		const wallet = (this.props.wallet.payload?.success) ? this.props.wallet.payload?.data : []
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:30}}>
					{cryptocoins &&
						cryptocoins.map((crypto, i) => {
							const walletNew = wallet.find(ele => ele._id == crypto._id)
							if ((this.props.route.params.typeOperation == 'addWallet') 
									? !walletNew 
									: walletNew) {
								return <ListCard key={i} image={Config.URI_PUBLIC+'/'+crypto.image} title={crypto.name} onPress={() => this.selectCryptocoin(this.props.route.params.typeOperation == 'addWallet' ? crypto : walletNew)} />
							}
						})
					}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	seeders: {
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
connect(state => ({ user: state.user, seeder: state.seeder, cryptocoin: state.cryptocoin, wallet: state.wallet })
)(WalletSelect);