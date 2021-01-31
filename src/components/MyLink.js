import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {I18n} from 'react-redux-i18n'

class MyLink extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {
	}

	render() {
		return (
			<TouchableOpacity style={[this.props.containerStyle ? this.props.containerStyle : {}]} onPress={this.props.onPress ? this.props.onPress : null}>
				<Text style={[styles.text, this.props.textStyle ? this.props.textStyle : {}]}>{this.props.text ? this.props.text : ''}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'gray'
	}
});

export default MyLink