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

const Loader = ({ navigation, showMessage, showModal, hideModal }) => {
	const data = {
		settings: {},
		data: {},
		token:
			"f38dfb6ef6a7a0181f72e20865b2ab6a8422b9e2a695f014be11980d9d748ac9a32f2a90c062214c715469702df28f6a84db10870fb18eb419a1051653bcbe7953416fc13038592c7f81c28ef96a9b8af81866f2a981cafb91e057fce934f951f7f7d004818d569e3517ab4a38bfcf541fdd40c063bcb589bcce0d6aa3d69e23a10d1c92c74d1a5539bd3bb7932477fba0e68456d0463bf5e4a3c0a7c81ad0b12fe3f40dc69ae18831b54fb633584ea8b870aa6d4a6776e4922b6792603c699004c4356b51627a841a6bbeb82890c9d5f8f8276423fd88ae9a0b261e3745447911f2b42d40db1dd788f789645fd5042c",
		user: {
			_id: "5ea030dd1f42cd0a641c4b00",
			serialNumber: "776fe00e",
			name: "МАСЛЕННИКОВ АРТЕМ ДМИТРИЕВИЧ",
			role: "user",
			verified: true,
			entities: [
				{ tin: "306589734", name: "ООО UCARD  ELEMENT", type: "yur" }
			],
			tin: "306589734",
			type: "yur",
			entityName: "ООО UCARD  ELEMENT",
			verification: "3f27d596-f1ba-4113-a935-fcd7751383a7"
		}
	};

	let bootstrap = async () => {
		//TODO check if the user has logged in
		showModal(strings.refreshToken);
		try {
			let credentials = await AsyncStorage.getItem("@credentials");
			if (credentials) {
				let newCredentials = JSON.parse(credentials);
				showModal(strings.validating);
				let res = await requests.auth.validateToken(
					newCredentials.token
				);
				console.warn(res);
			}
		} catch (error) {
			hideModal();
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
		}
		hideModal();
		// navigation.navigate("Login");
	};
	useEffect(() => {
		bootstrap();
	}, []);
	return (
		<View style={styles.container}>
			{/* <LoadingModal modalVisible={true} message={strings.tokenRefresh} /> */}
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
