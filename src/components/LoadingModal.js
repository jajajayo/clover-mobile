import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native'
import { Spinner, Grid, Col, Row } from "native-base";
import Modal from 'react-native-modal';
import {I18n} from 'react-redux-i18n'

class LoadingModal extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	async componentDidMount(){}

	render() {
		return (
			<Modal isVisible={true} animationInTiming={0.1}>
				<View style={styles.row}>
					<Spinner />
					<Text>{I18n.t('loadingModal')}</Text>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		flexDirection:'column',
		alignItems:'center',
	},
	row: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 40
	}
});

export default LoadingModal;