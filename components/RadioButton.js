import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
export default class RadioButton extends Component {
	state = {
		value: null,
	};
	render() {
		const { PROP } = this.props;
		const { value } = this.state;
		return (
			<View style={styles.container}>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.container2}>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									this.setState({
										value: res.key,
									});
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
                            <Text style={styles.radioText}>{res.text}</Text>
						</View>
					);
				})}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
        marginLeft: '10%',
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-between',
	},
    container2: {
        alignItems: 'center',
        flexDirection: 'row',
	},
    radioText: {
        marginRight: 35,
        fontSize: 15,
        color: '#000',
        fontWeight: '200'
    },
	radioCircle: {
		height: 15,
		width: 15,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: '#3740ff',
    },
});