import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import IconFA from 'react-native-vector-icons/dist/FontAwesome'
import IconFA5 from 'react-native-vector-icons/dist/FontAwesome5'

class ListCard extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} {...this.props}>
				{this.props.icon && 
					<View style={{flex:1}}>
						{(this.props.FontAwesome) 
							? <IconFA name={(this.props.icon) ? this.props.icon : 'credit-card'} style={{fontSize:30, color: this.props.iconColor ? this.props.iconColor : 'black'}} />
							: (this.props.FontAwesome5)
								? <IconFA5 name={(this.props.icon) ? this.props.icon : 'credit-card'} style={{fontSize:30, color: this.props.iconColor ? this.props.iconColor : 'black'}} />
								: <Icon name={(this.props.icon) ? this.props.icon : 'credit-card'} style={{fontSize:30, color: this.props.iconColor ? this.props.iconColor : 'black'}} />
						}
					</View>
				}
				<View style={{flex:8}}>
					<Text style={{paddingLeft:15, fontSize: 18, color: 'black'}} >{this.props.title}</Text>
				</View>
				<View style={{flex:1, alignItems:'center'}}>
					<Icon name='chevron-right' style={{fontSize: 28, color: 'lightgray'}} />
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
	}
});

export default ListCard;