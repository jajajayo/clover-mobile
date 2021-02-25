import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { connect } from 'react-redux'
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

import { seederActions } from '../../../src/redux/seeder/actions'
import CardWallet from '../../components/CardWallet'
import MyTextInput from '../../components/MyTextInput'
import MyButton from '../../components/MyButton'
//import { TouchableOpacity } from 'react-native-gesture-handler';

const btnActStyle = {
	borderWidth: 1,
	borderColor: '#74bae5',
	backgroundColor: '#74bae5'
}

const textActStyle = {
	color: 'white'
}

const btnInactStyle = {
	borderWidth: 1,
	borderColor: 'gray'
}

const textInactStyle = {
	color: 'gray'
}

class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seeders: [],
			selectedOptions: []
		}
		this.showToast = this.props.route.params.showToast
	}

	async componentDidMount() {
		await this.props.listRandom()
		if (this.props.seeder.payload.success) {
			this.setState({ seeders: this.props.seeder.payload.data })
		}
	}

	selectOption = (id, index) => {
		let {selectedOptions} = this.state 
		if (selectedOptions[index]?.value) {
			selectedOptions[index].value = false
			selectedOptions[index].id = id
		} else {
			selectedOptions[index] = {
				value: true
			}
		}
		this.setState({ selectedOptions: selectedOptions })
		this.forceUpdate()
	}

	render() {
		const {selectedOptions} = this.state
		console.log(selectedOptions)
		return (
			<Container>
				<Content contentContainerStyle={{paddingTop:'8%'}} padder>
					<Text style={{fontSize:16,color:'gray', textAlign:'center', padding:10}}>{I18n.t('wallet.subTitleSeeder')}</Text>
					<View style={styles.btnSection}>
						{this.state.seeders?.length > 0 &&
							this.state.seeders.map((seeder, index) => (
								<View style={{padding:5}}>
									<TouchableOpacity 
										style={[styles.seeders, (selectedOptions[index]?.value) ? btnActStyle : btnInactStyle]}
										onPress={() => this.selectOption(seeder._id, index)}
									>
										<Text style={[(selectedOptions[index]?.value) ? textActStyle : textInactStyle]}>{(index+1) + ' ' + seeder.name}</Text>
									</TouchableOpacity>
								</View>
							))
						}
					</View>
					<View style={styles.copyBtn}>
						<TouchableOpacity style={{marginRight:15}}>
							<Text style={{color:'#498adc', fontWeight:'bold', fontSize:16}}>{I18n.t('copy').toUpperCase()}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{marginLeft:15}}>
							<Text style={{color:'#498adc', fontWeight:'bold', fontSize:16}}>{I18n.t('showQR').toUpperCase()}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.info}>
						<Icon name='info' size={30} color='#498adc' />
						<Text style={{color:'#498adc', textAlign:'center', fontSize:17, marginTop: 5}}>{I18n.t('wallet.dontShare')}</Text>
					</View>
				</Content>
				<Footer style={{backgroundColor:'white', height:100}}>
					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
						<MyButton containerStyle={{width:'95%', padding:5 }} primary onPress={() => this.setAnswerValue('0', surveys, index)} text={I18n.t('continue').toUpperCase()} />
					</View>
				</Footer>
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
connect(state => ({ user: state.user, seeder: state.seeder, seeder: state.seeder }),
	dispatch => ({
		listRandom: () => dispatch(seederActions.listRandom())
	})
)(Wallet);