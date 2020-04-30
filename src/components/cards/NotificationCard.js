import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	LayoutAnimation
} from "react-native";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import images from "../../assets/images";
import { connect } from "react-redux";
import { hideNotification } from "../../redux/actions";
import { HIDE_NOTIFICATION } from "../../redux/types";

const NotificationCard = ({ hideNotification, dispatch }) => {
	let data = {
		doc: "doc",
		invoice: "invoice"
	};
	return (
		<View style={styles.container}>
			<View style={styles.textWrapper}>
				<Text style={styles.name}>OOO "FIDES"</Text>
				<Text style={styles.text}>{strings.incomingDocument}</Text>
				<Text style={styles.text}>{strings.invoice}</Text>
			</View>
			<View style={styles.iconWrapper}>
				<Image style={styles.image} source={images.bell} />
			</View>
			<TouchableWithoutFeedback
				onPress={() => {
					hideNotification();
					LayoutAnimation.configureNext(
						LayoutAnimation.Presets.easeInEaseOut
					);
				}}
			>
				<View style={styles.exitIcon}>
					<EvilIcons name="close" size={24} color={colors.white} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		backgroundColor: colors.paleTransparent,
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	exitIcon: {
		position: "absolute",
		top: 10,
		right: 10
	},
	name: {
		fontSize: 20,
		color: colors.white,
		fontFamily: "Rubik-Medium"
	},
	text: {
		fontSize: 11,
		color: colors.white
	},
	iconWrapper: {
		paddingHorizontal: 20
	},
	image: {
		transform: [{ rotate: "20deg" }],
		resizeMode: "cover",
		height: 60,
		width: 60
	}
});

let mapDispatchToProps = {
	hideNotification
};

export default connect(
	null,
	mapDispatchToProps
)(NotificationCard);
