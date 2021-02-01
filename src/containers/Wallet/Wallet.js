import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

import { cryptocoinActions } from '../../../src/redux/cryptocoin/actions'
import CardWallet from '../../components/CardWallet'
import MyTextInput from '../../components/MyTextInput'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cryptocoins: [],
		}
		this.showToast = this.props.route.params.showToast
	}

	async componentDidMount() {
		await this.props.getListCryptocoins()
		if (this.props.cryptocoin.payload.success) {
			this.setState({ cryptocoins: this.props.cryptocoin.payload.data })
		}
	}

	render() {
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'10%'}}>

					<View style={{width:'100%', flexDirection:'row'}}>
						<View style={{width:'50%', alignItems:'center'}}>
							<TouchableOpacity style={styles.arrow}>
								<Icon name='arrow-up' size={70} color='white' />
							</TouchableOpacity>
							<Text style={{fontSize:20}}>{I18n.t('wallet.send')}</Text>
						</View>
						<View style={{width:'50%', alignItems:'center'}}>
							<TouchableOpacity style={styles.arrow}>
								<Icon name='arrow-down' size={70} color='white' />
							</TouchableOpacity>
							<Text style={{fontSize:20}}>{I18n.t('wallet.receive')}</Text>
						</View>
					</View>

					<Text style={{fontSize:36, padding:10, textAlign:'center', paddingTop:0}}>$0.00</Text>
					<Text style={{fontSize:24, color:'gray', padding:10, marginLeft:10}}>{I18n.t('wallet.title')}</Text>
					{this.state.cryptocoins.map((cryptocoin, index) => (
						<CardWallet key={index} data={cryptocoin} />
					))}
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
		borderColor: 'green', 
		marginTop: 10, 
		width:'40%', 
		alignSelf:'center'
	},
	arrow: {
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 90,
		width: 90,
		height: 90
	}
});

export default
connect(state => ({ user: state.user, cryptocoin: state.cryptocoin }),
	dispatch => ({
		getListCryptocoins: () => dispatch(cryptocoinActions.list())
	})
)(Wallet);