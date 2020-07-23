import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { connect } from "react-redux";
import colors from "../../constants/colors";

const HeadUpMessage = ({ headUpType, headUpMessage }) => {
	const [translateY, setAnimation] = useState(new Animated.Value(-200));
	useEffect(() => {
		translateY.stopAnimation();
		Animated.timing(translateY, { toValue: 0 }).start();
		setTimeout(
			() => Animated.timing(translateY, { toValue: -200 }).start(),
			3000
		);
	}, [headUpMessage, headUpType]);
	return (
		<Animated.View
			style={[
				styles.container,
				{ transform: [{ translateY }], backgroundColor: headUpType }
			]}
		>
			<Text numberOfLines={3} style={styles.text}>
				{typeof headUpMessage === "string"
					? headUpMessage
					: "Unknown error occured!"}
			</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		paddingVertical: 20,
		position: "absolute",
		backgroundColor: "red",
		top: 0,
		left: 0,
		right: 0
	},
	text: {
		color: colors.white
	}
});

const mapStateToProps = ({ appState: { headUpMessage, headUpType } }) => ({
	headUpMessage,
	headUpType
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(HeadUpMessage);
