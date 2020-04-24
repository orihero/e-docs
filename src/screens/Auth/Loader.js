import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const Loader = ({ navigation }) => {
	useEffect(() => {
		//TODO check if the user has logged in
		navigation.navigate("Login");
	}, []);
	return (
		<View style={styles.container}>
			<Text />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});

export default Loader;
