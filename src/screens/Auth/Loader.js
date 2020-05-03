import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { userLoaded, userLoggedIn } from "../../redux/actions";
import LoadingModal from "../../components/containers/LoadingModal";

const Loader = ({ navigation }) => {
	let bootstrap = async () => {
		//TODO check if the user has logged in
		try {
			let credentials = await AsyncStorage.getItem("@credentials");
			console.warn(credentials);
		} catch (error) {}

		// navigation.navigate("Login");
	};
	useEffect(() => {
		bootstrap();
	}, []);
	return (
		<View style={styles.container}>
			<LoadingModal modalVisible={true} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});

const mapStateToProps = ({ user }) => ({
	user
});

const mapDispatchToProps = {
	userLoaded,
	userLoggedIn
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Loader);
