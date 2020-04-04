import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../../constants/colors";

const CustomInput = ({
	inputType,
	placeholder,
	textColor,
	value,
	onChange,
	style,
	...rest
}) => {
	return (
		<View style={[styles.container, style]}>
			<TextInput
				value={value}
				onChangeText={onChange}
				placeholderTextColor={colors.lightGrayText}
				secureTextEntry={inputType != "password" ? false : true}
				placeholder={placeholder}
				style={{ padding: 10 }}
				{...rest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: Platform.select({ android: 7, ios: 20 }),
		borderRadius: 5,
		marginBottom: 10,
		elevation: 2
	}
});

export default CustomInput;
