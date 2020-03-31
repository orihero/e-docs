import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
	cond,
	eq,
	greaterThan,
	multiply,
	Value,
	useCode,
	block,
	onChange,
	set
} from "react-native-reanimated";
import { withTransition, timing } from "react-native-redash";
import SafeAreaView from "react-native-safe-area-view";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../constants/colors";
import { Grid, Home } from "../../constants/icons";
import sizes from "../../constants/sizes";
import Particules from "./Particules";
import Wave from "./Wave";

const CustomFloatingTabbar = ({ navigation, onTabPress, ...rest }) => {
	let activeRef = useRef(new Value(0));
	let active = activeRef.current;
	const [transition, setTransition] = useState(withTransition(active));
	const [activeTransition, setActiveTransition] = useState(new Value(0));
	useCode(
		() =>
			block([
				onChange(active, set(activeTransition, 0)),
				set(activeTransition, timing({}))
			]),
		[active, activeTransition]
	);

	let homeActive = eq(active, 0);
	let homeTransition = withTransition(homeActive);
	let homeWidth = multiply(homeTransition, sizes.ICONS_SIZE);
	let homeLeft = greaterThan(transition, active);
	let homeDirection = cond(
		homeActive,
		cond(homeLeft, "rtl", "ltr"),
		cond(homeLeft, "ltr", "rtl")
	);

	let gridActive = eq(active, 1);
	let gridTransition = withTransition(gridActive);
	let gridWidth = multiply(gridTransition, sizes.ICONS_SIZE);
	let gridLeft = greaterThan(transition, active);
	let gridDirection = cond(
		gridActive,
		cond(gridLeft, "rtl", "ltr"),
		cond(gridLeft, "ltr", "rtl")
	);
	return (
		<SafeAreaView forceInset={{ top: "never" }}>
			<View style={styles.container}>
				<Animated.View
					style={[styles.singleTab, { direction: homeDirection }]}
				>
					<Wave active={active} index={0} />
					<TouchableWithoutFeedback
						onPress={() => {
							onTabPress({ route: navigation.state.routes[0] });
							active.setValue(0);
							// navigation.navigate("MainStack");
						}}
					>
						<View>
							<View style={StyleSheet.absoluteFill}>
								<Home />
							</View>
							<Animated.View
								style={{
									overflow: "hidden",
									width: homeWidth
								}}
							>
								<Home isActive={true} />
							</Animated.View>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
				<TouchableWithoutFeedback
					onPress={() => {
						// navigation.navigate("Add");
						onTabPress({ route: navigation.state.routes[1] });
					}}
				>
					<View style={styles.middelIcon}>
						<Feather name="plus" color={colors.white} size={50} />
					</View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={[styles.singleTab, { direction: gridDirection }]}
				>
					<Wave active={active} index={1} />
					<TouchableWithoutFeedback
						onPress={() => {
							onTabPress({ route: navigation.state.routes[2] });
							active.setValue(1);
							// navigation.navigate("ProfileStack");
						}}
					>
						<View>
							<View style={StyleSheet.absoluteFill}>
								<Grid />
							</View>
							<Animated.View
								style={{ overflow: "hidden", width: gridWidth }}
							>
								<Grid isActive={true} />
							</Animated.View>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
				<Particules
					activeTransition={activeTransition}
					transition={transition}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		height: 60,
		alignItems: "center"
	},
	middelIcon: {
		transform: [{ translateY: -30 }],
		shadowColor: colors.violet,
		shadowOpacity: 0.5,
		shadowRadius: 10,
		shadowOffset: { height: 5, width: 0 },
		backgroundColor: colors.violet,
		borderRadius: 60,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center"
	},
	singleTab: {
		width: sizes.ICONS_SIZE,
		height: sizes.ICONS_SIZE
	}
});

export default CustomFloatingTabbar;
