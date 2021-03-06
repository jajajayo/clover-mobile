import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {I18n} from 'react-redux-i18n'
import Icon from 'react-native-vector-icons/dist/Feather'

class MyTextInput extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	async componentDidMount() {}

	render() {
		return (
			<View style={[styles.container, this.props.containerStyle ? this.props.containerStyle : {}]} >
				<View style={{width: (this.props.icon ? '85%' : '100%')}}>
					<TextInput style={styles.textInput} {...this.props} placeholderTextColor='#7ED138' />
				</View>
				{this.props.icon &&
					<View style={{width:'15%', alignItems:'center'}}>
						<Icon name={this.props.icon} style={{fontSize:30, color: this.props.iconColor ? this.props.iconColor : '#49CC68'}} />
					</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderRadius: 30,
		borderColor: '#49CC68',
		flexDirection: 'row',
		alignItems: 'center'
	},
	textInput: {
		paddingLeft: 15,
		color: '#49CC68',
		fontSize: 18
	}
});

export default MyTextInput