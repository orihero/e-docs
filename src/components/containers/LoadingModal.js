import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import loadingAnimation from "../../assets/lottie/loading.json";
import colors from "../../constants/colors";

const LoadingModal = ({ message, modalVisible }) => {
	if (!modalVisible) {
		return null;
	}
	return (
		<View style={styles.container}>
			<LottieView source={loadingAnimation} autoPlay loop />
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white
	},
	text: {
		color: colors.black,
		fontSize: 18,
		marginTop: 200
	}
});

const mapStateToProps = ({ appState: { message, modalVisible } }) => ({
	message,
	modalVisible
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(LoadingModal);
