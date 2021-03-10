import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Container, Content, Button, List, ListItem, Grid, Row, Col } from 'native-base';
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

	async componentDidMount() {
	}

	render() {
		const transaction = this.props.route.params.transaction
		return (
			<Container>
				<Content padder>
					<List>
						<ListItem>
							<Row>
								<Col size={4} style={{justifyContent:'center'}}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('activity.idTransaction')}</Text>
								</Col>
								<Col size={6} style={{justifyContent:'center'}}>
									<Text style={{}}>{transaction.idTransaction}</Text>
								</Col>
							</Row>
						</ListItem>
						<ListItem>
							<Row>
								<Col size={4} style={{justifyContent:'center'}}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('activity.cryptocoin')}</Text>
								</Col>
								<Col size={6} style={{flexDirection: 'row', alignItems:'center'}}>
									<Image source={{uri: `${Config.URI_PUBLIC}/${transaction.cryptocoin.image}`}} style={styles.avatar} />
									<Text style={{marginLeft:10}}>{transaction.cryptocoin.name} ({transaction.cryptocoin.shortName})</Text>
								</Col>
							</Row>
						</ListItem>
						<ListItem>
							<Row>
								<Col size={4}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('activity.amount')}</Text>
								</Col>
								<Col size={6}>
									<Text style={{}}>{transaction.amount}</Text>
								</Col>
							</Row>
						</ListItem>
						<ListItem>
							<Row>
								<Col size={4}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('activity.userReceive')}</Text>
								</Col>
								<Col size={6}>
									<Text style={{}}>{transaction.userReceive.email}</Text>
								</Col>
							</Row>
						</ListItem>
						<ListItem>
							<Row>
								<Col size={4} style={{justifyContent:'center'}}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('Wallet')}</Text>
								</Col>
								<Col size={6} style={{justifyContent:'center'}}>
									<Text style={{}}>{transaction.walletReceive}</Text>
								</Col>
							</Row>
						</ListItem>
						<ListItem>
							<Row>
								<Col size={4}>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{I18n.t('activity.date')}</Text>
								</Col>
								<Col size={6}>
									<Text style={{}}>{moment(transaction.createdAt).format('DD-MM-YYYY HH:mm')}</Text>
								</Col>
							</Row>
						</ListItem>
					</List>
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
		height:90
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