import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import {
	userLoaded,
	userLoggedIn,
	showMessage,
	showModal,
	hideModal,
	setSettings
} from "../../redux/actions";
import LoadingModal from "../../components/containers/LoadingModal";
import strings from "../../locales/strings";
import requests from "../../api/requests";
import Axios from "axios";
import { url } from "../../api/configs";
import CustomPicker from "../../components/common/CustomPicker";

const Loader = ({
	navigation,
	showMessage,
	showModal,
	hideModal,
	userLoggedIn,
	setSettings
}) => {
	let bootstrap = async () => {
		//TODO check if the user has logged in
		showModal(strings.refreshToken);
		let newCredentials = {};
		try {
			let credentials = await AsyncStorage.getItem("@credentials");
			let settings = await AsyncStorage.getItem("@settings");
			console.log({ settings });
			setSettings(JSON.parse(settings));
			if (credentials) {
				newCredentials = JSON.parse(credentials);
				showModal(strings.validating);
				let res = await requests.auth.validateToken(
					newCredentials.token
				);
				userLoggedIn({ ...newCredentials, ...res.json() });

				if (!res.json()) {
					hideModal();
					navigation.navigate("Login");
					return;
				}
			} else {
				hideModal();
				navigation.navigate("Login");
				return;
			}
		} catch (error) {
			// if (!!error) {
			// 	showMessage({
			// 		message: error.response,
			// 		type: colors.killerRed
			// 	});
			// }
			// showMessage({
			// 	message: error,
			// 	type: colors.killerRed
			// });
			console.log({ error, response: error.response });
			hideModal();
			navigation.navigate("Login");
			return;
		}
		hideModal();
		console.log({ newCredentials });
		navigation.navigate("PinCode", {
			credentials: newCredentials
		});
	};
	useEffect(() => {
		bootstrap();
	}, []);
	return (
		<View style={styles.container}>
			<LoadingModal modalVisible={true} message={strings.tokenRefresh} />
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
	userLoggedIn,
	showMessage,
	showModal,
	hideModal,
	setSettings
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Loader);
