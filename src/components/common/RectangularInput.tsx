import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import colors from "../../constants/colors";
import { TextInput } from "react-native-paper";

interface RectangularInputProps {
	placeholder?: string;
	onChange?: Function;
	value?: string;
	disabled?: string;
	containerStyle?: any;
}

const RectangularInput = ({
	placeholder,
	onChange = () => {},
	value,
	disabled,
	containerStyle,
	...rest
}: RectangularInputProps) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<TextInput
				{...rest}
				label={placeholder}
				numberOfLines={2}
				placeholder={placeholder}
				editable={!disabled}
				value={value}
				onChangeText={onChange}
				placeholderTextColor={colors.grayText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		backgroundColor: colors.lightBlueBackground,
		padding: Platform.select({ android: 3, ios: 20 }),
		paddingBottom: 2,
		justifyContent: "center"
	}
});

export default RectangularInput;
