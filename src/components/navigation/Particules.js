import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import sizes from "../../constants/sizes";
import colors from "../../constants/colors";
import Animated, {
	multiply,
	interpolate,
	and,
	neq,
	add,
	or,
	Extrapolate,
	divide
} from "react-native-reanimated";
import { withSpringTransition } from "react-native-redash";
const { width } = Dimensions.get("window");

let size = 6;
let topParticules = [0, 1, 2];
let bottomParticules = [0, 1];

let HEIGHT = sizes.ICONS_SIZE;
let SEGMENT = width / 2;

const Particules = ({ transition, activeTransition }) => {
	let middle = HEIGHT / 2;
	let opacity = 1; /*  and(neq(activeTransition, 0), neq(activeTransition, 1)); */

	let x = add(
		multiply(transition, SEGMENT + sizes.ICONS_SIZE * 3 - size),
		SEGMENT / 3 - 5
	);
	let top = interpolate(activeTransition, {
		inputRange: [0, 0.5, 1],
		outputRange: [middle, 0, middle],
		extrapolate: Extrapolate.CLAMP
	});
	let bottom = interpolate(activeTransition, {
		inputRange: [0, 0.5, 1],
		outputRange: [middle, HEIGHT, middle],
		extrapolate: Extrapolate.CLAMP
	});
	let s = interpolate(activeTransition, {
		inputRange: [0, 0.5, 1],
		outputRange: [0.8, 1, 0.8]
	});
	return (
		<View style={styles.container} pointerEvents={"none"}>
			<View style={styles.particules}>
				{topParticules.map(e => {
					let subParticles = topParticules.slice(0, e);
					let translateX = subParticles.reduce(
						acc =>
							withSpringTransition(acc, {
								overshootClamping: -1,
								damping: 1000
							}),
						x
					);
					let translateY = subParticles.reduce(
						acc => withSpringTransition(acc),
						top
					);
					let scale = subParticles.reduce(
						acc => withSpringTransition(acc),
						s
					);
					return (
						<Animated.View
							key={e}
							style={[
								styles.particule,
								{
									opacity,
									transform: [
										{ translateX, translateY, scale }
									]
								}
							]}
						/>
					);
				})}
				{bottomParticules.map(e => {
					let subParticles = bottomParticules.slice(0, e);
					let translateX = subParticles.reduce(
						acc =>
							withSpringTransition(acc, {
								overshootClamping: -1,
								damping: 100000
							}),
						divide(
							add(
								x,
								withSpringTransition(x, {
									overshootClamping: -1,
									damping: 100000
								})
							),
							2
						)
					);

					let translateY = subParticles.reduce(
						acc => withSpringTransition(acc),
						divide(
							add(
								bottom,
								withSpringTransition(bottom, {
									overshootClamping: -1,
									damping: 100000
								})
							),
							2
						)
					);
					let scale = subParticles.reduce(
						acc => withSpringTransition(acc),
						divide(
							add(
								s,
								withSpringTransition(s, {
									overshootClamping: -1,
									damping: 100000
								})
							),
							2
						)
					);
					return (
						<Animated.View
							key={e}
							style={[
								styles.particule,
								{
									opacity,
									transform: [
										{ translateX, translateY, scale }
									]
								}
							]}
						/>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center"
	},
	particules: {
		height: HEIGHT
	},
	particule: {
		position: "absolute",
		top: 0,
		left: 0,
		width: size,
		height: size,
		borderRadius: size,
		backgroundColor: colors.flowerBlue
	}
});

export default Particules;
