import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { connect } from "react-redux";
import colors from "../../constants/colors";
import { useSafeArea } from "react-native-safe-area-context";

const HeadUpMessage = ({ headUpType, headUpMessage, headUpKey }) => {
	const [translateY, setAnimation] = useState(new Animated.Value(-200));
	let inents = useSafeArea();
	useEffect(() => {
		if (!headUpType) {
			return;
		}
		translateY.stopAnimation();
		Animated.timing(translateY, { toValue: 0 }).start();
		setTimeout(
			() => Animated.timing(translateY, { toValue: -200 }).start(),
			3000
		);
		console.warn({ headUpMessage });
	}, [headUpMessage, headUpType, headUpKey]);
	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					backgroundColor: headUpType,
					paddingTop: inents.top * 1.5
				}
			]}
		>
			<Text numberOfLines={3} style={styles.text}>
				{typeof headUpMessage === "string" ? headUpMessage : ""}
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

const mapStateToProps = ({
	appState: { headUpMessage, headUpType, headUpKey }
}) => ({
	headUpMessage,
	headUpType,
	headUpKey
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(HeadUpMessage);
