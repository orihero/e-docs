import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../constants/colors";
import LinearGradient from "react-native-linear-gradient";

const RectangleButton = ({ text, backColor, onPress, style = {} }) => {
	let {
		startColor = "#7EB6FF",
		endColor = "#5F87E7",
		padding,
		paddingVertical,
		...containerStyle
	} = style;
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: backColor
					},
					containerStyle
				]}
			>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={[StyleSheet.absoluteFill, {}]}
					colors={[startColor, endColor]}
				/>
				<Text style={{ ...styles.text, padding, paddingVertical }}>
					{text}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.dimGreen,
		flex: 1,
		paddingVertical: 13,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden"
	},
	text: {
		fontFamily: "Rubik-Medium",
		color: colors.white
	}
});

export default RectangleButton;
