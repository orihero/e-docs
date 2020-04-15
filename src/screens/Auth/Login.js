import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
	hideMessage
} from "../../redux/actions";

const Login = ({
	navigation,
	showModal,
	hideModal,
	showMessage,
	hideMessage
}) => {
	const [serialNumber, setSerialNumber] = useState("");
	let login = async () => {
		showModal(strings.loading);
		try {
			//get authId
			let authId = await requests.auth.getAuthId(serialNumber);
			// wrap it within object
			let req = JSON.stringify({ authId });
			//get sign
			let { pkcs7 } = await signProvider.sign(req);
			let res = await requests.auth.login({ serialNumber, pkcs7 });
			console.log(res.data);
			navigation.navigate();
			hideModal();
		} catch (error) {
			console.warn(error.response);

			hideModal();
			showMessage({ message: error.message, type: colors.killerRed });
		}
	};
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>{strings.welcome}</Text>
			<Text style={styles.desc}>{strings.loginInfo}</Text>
			<CustomInput
				inputType="text"
				textColor={colors.darkGrayBorder}
				placeholder={strings.enterLogin}
				value={serialNumber}
				onChange={setSerialNumber}
				style={{ marginHorizontal: 20 }}
				placeholderTextColor={colors.grayText}
				maxLength={9}
			/>
			<View>
				<RectangleButton
					backColor={colors.jeansBlue}
					text={strings.startWorking}
					onPress={login}
					style={{
						marginTop: 20,
						paddingVertical: 15,
						marginHorizontal: 20
					}}
				/>
			</View>
		</ScrollView>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	showModal,
	hideModal,
	showMessage,
	hideMessage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
