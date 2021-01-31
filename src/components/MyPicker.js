import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Picker } from 'native-base'
//import { Picker } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/dist/Feather'

class MyPicker extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Picker
					mode="dropdown"
					style={{ width: '100%', color:'green' }}
					placeholder="Select your SIM"
					placeholderStyle={{ color: "#bfc6ea" }}
					placeholderIconColor="#007aff"
					selectedValue={(this.props.selectedValue) ? this.props.selectedValue : ''}
					onValueChange={this.props.callback.bind(this)}
				>
					<Picker.Item label="País" value="" />
					{(this.props.values && this.props.values.length > 0) &&
						this.props.values.map((element, i) => (
							<Picker.Item key={i} label={element[this.props.keyValue]} value={element[this.props.keyLabel]} />
						))
					}
				</Picker>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 30,
		borderColor: 'green',
		width:'100%', 
		paddingTop:10, 
		paddingBottom:10,
		paddingLeft: 15,
		height:50,
		marginTop: 5,
		marginBottom:10,
		alignItems:'center',
		justifyContent:'center'
	}
});

export default MyPicker;