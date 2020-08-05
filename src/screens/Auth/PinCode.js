import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TouchID from "react-native-touch-id";
import CustomKeyboard from "../../components/common/CustomKeyboard";
import PinCodeIndicator from "../../components/common/PinCodeIndicator";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-community/async-storage";
import strings from "../../locales/strings";

let defaultPinState = {
	code: "",
	locked: false
};

const SetUpPinCode = ({ navigation }) => {
	let credentials = navigation.getParam("credentials") || {};
	const [pin, setPin] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [failedCount, setFailedCount] = useState(-1);
	let { code, locked } = credentials;
	/**
	 * Check if touch id supported {@link react-native-touch-id}
	 */
	let checkTouchID = async () => {
		console.log("CHECKING TOUCH ID");
		try {
			await TouchID.isSupported(); //* Supported
		} catch (error) {
			//* Not supported
			console.log(error);
			return;
		}
		try {
			let res = await TouchID.authenticate(strings.authReason);
			navigation.navigate("Main");
		} catch (error) {
			//* Cancelled or failed to authenticate
			console.log(error);
			return;
		}
	};

	useEffect(() => {
		if (!!credentials.code) checkTouchID();
	}, [credentials.code]);
	let resetAll = () => {
		setPin("");
		setConfirmPin("");
		setFailedCount(-1);
	};
	let onKeyPress = async key => {
		let newPin = pin + key;
		console.log({ credentials });
		if (key === "delete") {
			if (pin.length > 0) {
				setPin(pin.substr(0, pin.length - 1));
				return;
			} else {
				return;
			}
		}
		if (!!credentials.code && newPin.length === 4) {
			console.log({ newPin, code });
			//* User already set up pin
			if (newPin === code) {
				navigation.navigate("Main");
			} else {
				//* Incorrect pin. Show error
				let newFails = failedCount === -1 ? 3 : failedCount - 1;
				if (newFails === 0) {
					//* Failed to login reset all
					resetAll();
					//* Lock the app for 24 hours
					// let lockedTime = new Date(Date.now());
					// lockedTime.setDate(lockedTime.getDate() + 1);
					// setLocked(lockedTime, LockType.PIN);
					// setFailedCount(newFails);
					// setPin("");
					// navigation.navigate(SCREENS.LOCKED, {
					// 	lockType: LockType.PIN
					// });
					return;
				} else {
					console.log("FAILED. SETTING PIN TO ``");
					// resetAll();
					setPin("");
					setFailedCount(newFails);
					return;
				}
			}
		}
		if (pin.length === 4) {
			console.log("SETTING PIN");
			//* User has set up pin. Should ask for pin confirmation
			let newValue = confirmPin + key;
			//* Confirm pin also filled. Check if the match
			if (newValue.length === 4) {
				if (newValue === pin) {
					console.log("PIN CONFIRMED");
					//* Save the credentials
					// await setInternetCredentials(
					// 	deviceInfoModule.getBundleId(),
					// 	token,
					// 	pin
					// );
					// setPinCode(pin);
					await AsyncStorage.setItem(
						"@credentials",
						JSON.stringify({
							...credentials,
							code: newValue,
							locked: false
						})
					);
					//* Everything is good. Proceed
					navigation.navigate("Main");
					return;
				} else {
					//* Incorrect pin confirmation. Show error
					let newFails = failedCount === -1 ? 3 : failedCount - 1;
					if (newFails === 0) {
						//* Failed to confirm reset all
						resetAll();
						return;
					}
					setFailedCount(newFails);
					setConfirmPin("");
					return;
				}
			}
			setConfirmPin(newValue);
			return;
		}
		setPin(pin + key);
	};
	//* all fields has been set
	let allFilled = pin.length === 4 && confirmPin.length === 4;
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.boldText}>
					{!credentials.code
						? pin.length === 4
							? strings.repeatPin
							: strings.setUpPin
						: strings.enterPinCode}
				</Text>
				<PinCodeIndicator
					count={4}
					activeCount={
						pin.length === 4 ? confirmPin.length : pin.length
					}
				/>
				{failedCount !== -1 && (
					<Text style={styles.dangerText}>
						{strings.formatString(
							strings.failedAttemps,
							strings.pin
						)}{" "}
						{failedCount}
					</Text>
				)}
			</View>
			<View style={styles.container}>
				<CustomKeyboard onPress={onKeyPress} />
			</View>
		</View>
	);
};

export default SetUpPinCode;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	top: {
		justifyContent: "space-around",
		alignItems: "center",
		flex: 1
	},
	boldText: {
		fontSize: 21,
		fontWeight: "bold"
	},
	dangerText: {
		color: colors.red,
		textAlign: "center",
		fontSize: 14
	}
});
