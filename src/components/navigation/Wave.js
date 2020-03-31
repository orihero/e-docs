import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { sub, eq, interpolate } from "react-native-reanimated";
import sizes from "../../constants/sizes";
import colors from "../../constants/colors";
import { withTransition, bInterpolate } from "react-native-redash";

const Wave = ({ index, active }) => {
	const isActive = eq(active, index);
	const activeTransition = withTransition(isActive, { duration: 250 });
	const opacity = interpolate(activeTransition, {
		inputRange: [0, 0.5, 1],
		outputRange: [0, 1, 0]
	});
	const scale = bInterpolate(activeTransition, 0.1, 1.5);
	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.wave, { opacity, transform: [{ scale }] }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center"
	},
	wave: {
		width: sizes.ICONS_SIZE * 2,
		height: sizes.ICONS_SIZE * 2,
		borderRadius: sizes.ICONS_SIZE * 2,
		borderColor: colors.flowerBlue,
		borderWidth: 4
	}
});

export default Wave;
