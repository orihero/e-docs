import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TouchID from "react-native-touch-id";
import CustomKeyboard from "../../components/common/CustomKeyboard";
import PinCodeIndicator from "../../components/common/PinCodeIndicator";
import { strings } from "../../locales/strings";
import colors from "../../constants/colors";

const SetUpPinCode = ({ navigation }) => {
	const [pin, setPin] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [failedCount, setFailedCount] = useState(-1);
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
			navigation.navigate(SCREENS.MAIN);
		} catch (error) {
			//* Cancelled or failed to authenticate
			console.log(error);
			return;
		}
	};

	useEffect(() => {
		if (!isSetup) checkTouchID();
	}, [isSetup]);
	let resetAll = () => {
		setPin("");
		setConfirmPin("");
		setFailedCount(-1);
	};
	let onKeyPress = async key => {
		let newPin = pin + key;
		if (key === "back-delete" && pin.length > 0) {
			setPin(pin.substr(0, pin.length - 1));
			return;
		}
		if (!isSetup && newPin.length === 4) {
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
				}
				return;
			}
		}
		if (pin.length === 4 && isSetup) {
			//* User has set up pin. Should ask for pin confirmation
			let newValue = confirmPin + key;
			//* Confirm pin also filled. Check if the match
			if (newValue.length === 4) {
				if (newValue === pin) {
					//* Save the credentials
					// await setInternetCredentials(
					// 	deviceInfoModule.getBundleId(),
					// 	token,
					// 	pin
					// );
					setPinCode(pin);
					//* Everything is good. Proceed
					navigation.navigate(SCREENS.SET_UP_TOUCH_ID);
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
					{isSetup
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

export default connector(SetUpPinCode);

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
