import React from "react";
import { View, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Text from "./Text";
import colors from "../../constants/colors";

const SmallButton = ({ borderColor, backColor, iconName, text }) => {
	return (
		<View
			style={[
				styles.container,
				backColor && {
					backgroundColor: backColor
				},
				borderColor && {
					borderColor: borderColor,
					borderWidth: 1
				}
			]}
		>
			{text ? <Text style={styles.text}>{text}</Text> : <></>}
			{iconName ? (
				<AntDesign name={iconName} size={25} color={colors.white} />
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 12,
		minWidth: 60,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10
	},
	text: {
		color: colors.grayText
	}
});

export default SmallButton;
