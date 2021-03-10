import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import Config from 'react-native-config'

class CardWallet extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render() {
		let data = this.props.data
		return (
			<TouchableOpacity style={styles.container} {...this.props}>
				
				<View style={{flex:1}}>
					{data.image && 
						<Image source={{uri: `${Config.URI_PUBLIC}/${data.image}`}} style={styles.avatar} />
					}
				</View>
				<View style={{flex:3, paddingLeft:25}}>
					<Text style={styles.title} >{data.name}</Text>
					<Text style={styles.subtitle} >$35,000.00 <Text style={{color:'green'}}> +0.26%</Text></Text>
				</View>
				<View style={{flex:3, alignItems:'flex-end'}}>
					<Text style={styles.title} >{data.amount} {data.shortName}</Text>
					<Text style={styles.subtitle} >$0.00</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		padding: 15,
		borderRadius: 6,
		borderColor: 'lightgray',
		height:90
	},
	avatar: {
		width: 65,
		height: 65,
		borderRadius: 65,
		alignItems: 'center',
		justifyContent: 'center'
	},
	nameAvatar: {
		backgroundColor: '#7bd8dd',
		width: 65,
		height: 65,
		borderRadius: 65,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textAvatar: {
		fontSize: 50,
		color: 'white'
	},
	title: {
		fontSize: 20, 
		color: 'black'
	},
	subtitle: {
		fontSize: 14, 
		color: 'gray'
	}
});

export default CardWallet;