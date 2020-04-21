import React from "react";
import { View, Text } from "react-native";

const Loader = ({ navigation }) => {
	useEffect(() => {
		//TODO check if the user has logged in
		navigation.navigate("Login");
	}, []);
	return (
		<View>
			<Text />
		</View>
	);
};

export default Loader;
