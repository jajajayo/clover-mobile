import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

class ListCardPic extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render() {
		const data = this.props.data.idContact
		return (
			<TouchableOpacity style={styles.container} {...this.props}>
				{data.image ? 
					<View style={{flex:1}}>
						<Image source={data.image} style={styles.avatar} />
					</View>
					:
					<View style={{flex:1}}>
						<View style={styles.nameAvatar}>
							<Text style={styles.textAvatar}>{(data.name) ? data.name.charAt(0).toUpperCase() : ''}</Text>
						</View>
					</View>
				}
				<View style={{flex:5}}>
					<Text style={styles.name} >{data.name + ' ' + data.lastName}</Text>
					<Text style={styles.email} >{data.email}</Text>
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
	name: {
		paddingLeft:15, 
		fontSize: 22, 
		color: 'black'
	},
	email: {
		paddingLeft:15, 
		fontSize: 16, 
		color: 'gray'
	}
});

export default ListCardPic;