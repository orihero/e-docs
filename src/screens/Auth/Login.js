import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import { withNavigation } from "react-navigation";
import CustomInput from "../../components/common/CustomInput";
import RectangleButton from "../../components/common/RectangleButton";
import Text from "../../components/common/Text";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import signProvider from "../../utils/signProvider";
import requests from "../../api/requests";
import { connect } from "react-redux";
import {
	showModal,
	hideModal,
	showMessage,
	hideMessage,
	userLoggedIn
} from "../../redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";
import Axios from "axios";
import { prodUrl, url } from "../../api/configs";

const Login = ({
	navigation,
	showModal,
	hideModal,
	showMessage,
	hideMessage,
	userLoggedIn,
	settings
}) => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	let requestLogin = async () => {
		showModal(strings.authorization);
		try {
			let res = await requests.auth.login(
				{
					login,
					password
				},
				settings.url.value ? url : prodUrl
			);
			let data = res.json();
			if (data.success === false) {
				showMessage({
					type: colors.killerRed,
					message: strings[data.errors.msg] || data.errors.msg
				});
				hideModal();
				return;
			}
			userLoggedIn(data);
			navigation.navigate("PinCode", { credentials: data });
			hideModal();
		} catch (error) {
			console.log(error);
			let { response } = error;
			if (!!response) {
				console.log(response);
			}
			hideModal();
			showMessage({ message: error.message, type: colors.killerRed });
		}
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.select({ android: "position", ios: null })}
			style={styles.container}
		>
			<Text style={styles.title}>{strings.welcome}</Text>
			<Text style={styles.desc}>{strings.loginInfo}</Text>
			<CustomInput
				inputType="text"
				textColor={colors.darkGrayBorder}
				placeholder={strings.enterLogin}
				value={login}
				onChange={setLogin}
				style={{ marginHorizontal: 20 }}
				placeholderTextColor={colors.grayText}
			/>
			<CustomInput
				inputType="text"
				textColor={colors.darkGrayBorder}
				placeholder={strings.enterPassword}
				value={password}
				onChange={setPassword}
				style={{ marginHorizontal: 20 }}
				placeholderTextColor={colors.grayText}
				secureTextEntry
			/>
			<View>
				<RectangleButton
					backColor={colors.jeansBlue}
					text={strings.startWorking || "DSA"}
					onPress={requestLogin}
					style={{
						marginTop: 20,
						paddingVertical: 25,
						marginHorizontal: 20,
						paddingBottom: 30,
						paddingTop: 15
					}}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		backgroundColor: colors.lightBlueBackground,
		flex: 1
	},
	title: {
		color: colors.darkViolet,
		textAlign: "center",
		fontSize: 22,
		fontWeight: "600",
		paddingBottom: 20
	},
	desc: {
		color: colors.paleBlueText,
		fontSize: 17,
		textAlign: "center",
		paddingBottom: 40,
		padding: 15,
		fontWeight: "100"
	}
});

const mapStateToProps = ({ appState: { settings } }) => ({ settings });

const mapDispatchToProps = {
	showModal,
	hideModal,
	showMessage,
	hideMessage,
	userLoggedIn
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
