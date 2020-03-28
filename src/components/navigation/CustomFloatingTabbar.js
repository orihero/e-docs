import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import { Home, Grid } from "../../constants/icons";

const CustomFloatingTabbar = ({}) => {
	return (
		<SafeAreaView forceInset={{ top: "never" }}>
			<View style={styles.container}>
				<View>
					<Home />
				</View>
				<View style={styles.middelIcon}>
					<Feather name="plus" color={colors.white} size={50} />
				</View>
				<View>
					<Grid isActive={true} />
				</View>
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
	}
});

export default CustomFloatingTabbar;
