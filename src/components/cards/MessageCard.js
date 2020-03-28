import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";

const MessageCard = ({ item }) => {
	let [backgroundColor, setBackgroundColor] = useState("transparent");

	useEffect(() => {
		switch (item.status) {
			case "signed":
				setBackgroundColor(colors.green);
				break;
			case "received":
				setBackgroundColor(colors.gold);
				break;
			case "rejected":
				setBackgroundColor(colors.darkPink);
				break;
		}
	}, []);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: backgroundColor
				}
			]}
		>
			<View style={styles.content}>
				<View style={styles.textWrapper}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.date}>{item.date}</Text>
				</View>
				<View style={styles.textWrapper}>
					<Text style={[styles.text]}>
						{strings.amount}: {item.amount}
					</Text>
					<Text style={styles.text}>{item.mid}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingLeft: 3,
		borderRadius: 5,
		marginBottom: 10,
		elevation: 3,
		marginHorizontal: 20
	},
	content: {
		backgroundColor: colors.white,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 10,
		borderTopLeftRadius: 2,
		borderBottomLeftRadius: 2,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	textWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10
	},
	name: {
		color: colors.darkViolet,
		fontSize: 14,
		fontWeight: "bold"
	},
	date: {
		color: colors.grayText
		// fontWeight: 'bold',
	},
	text: { color: colors.darkGrayBorder }
});

export default MessageCard;
