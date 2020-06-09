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
	hideModal
} from "../../redux/actions";
import LoadingModal from "../../components/containers/LoadingModal";
import strings from "../../locales/strings";
import requests from "../../api/requests";
import Axios from "axios";
import { url } from "../../api/configs";

const Loader = ({
	navigation,
	showMessage,
	showModal,
	hideModal,
	userLoggedIn
}) => {
	let bootstrap = async () => {
		//TODO check if the user has logged in
		showModal(strings.refreshToken);
		try {
			let credentials = await AsyncStorage.getItem("@credentials");
			if (credentials) {
				let newCredentials = JSON.parse(credentials);
				showModal(strings.validating);
				// let check = await Axios.get(`${url}/token`, {
				// 	headers: {
				// 		Authorization: `Bearer ${newCredentials.token}`
				// 	}
				// });
				// console.log(check);
				let res = await requests.auth.validateToken(
					newCredentials.token
				);
				userLoggedIn(res.json());

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
			// console.log(Object.keys(error));
			// console.log(error);
			if (!!error) {
				showMessage({
					message: error.response,
					type: colors.killerRed
				});
			}
			showMessage({
				message: error,
				type: colors.killerRed
			});
			hideModal();
			navigation.navigate("Login");
			return;
		}
		hideModal();
		navigation.navigate("Main");
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
	hideModal
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Loader);
