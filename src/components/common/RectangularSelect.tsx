import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Picker from "react-native-picker-select";
import Text from "./Text";
import Icons from "react-native-vector-icons/AntDesign";
import colors from "../../constants/colors";

interface RectangularSelectProps {
	placeholder?: string;
	containerStyle?: Object;
	disabled?: boolean;
	items?: any[];
	onChange?: Function;
	value?: string;
}

const RectangularSelect = ({
	placeholder = "",
	style,
	disabled = false,
	items = [],
	onChange = () => {},
	value
}: RectangularSelectProps) => {
	// let val =
	// 	value !== null && value !== undefined
	// 		? items[value]
	// 			? items[value].label
	// 			: items.find(e => {
	// 					return e.actualValue === value;
	// 			  })?.label||placeholder
	// 		: placeholder;
	return (
		<View style={styles.container}>
			<Picker
				style={{
					...pickerSelectStyles
				}}
				onValueChange={e => {
					onChange(e);
				}}
				disabled={disabled}
				value={value}
				placeholder={{
					label: placeholder,
					value: -1,
					color: colors.black
				}}
				placeholderTextColor={colors.grayText}
				items={items}
				useNativeAndroidPickerStyle={false}
				Icon={() => (
					<Icons
						name={"down"}
						color={colors.grayText}
						size={24}
						style={{
							paddingHorizontal: 10,
							paddingVertical: 16,
							zIndex: 1
						}}
					/>
				)}
			/>
		</View>
	);
};

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 18,
		borderBottomWidth: 1,
		borderColor: colors.grayBorder,
		color: "black",
		paddingRight: 30 // to ensure the text is never behind the icon,,
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 18,
		borderBottomWidth: 1,
		borderColor: colors.grayBorder,
		color: "black",
		paddingRight: 30 // to ensure the text is never behind the icon,,
	},
	inputAndroidContainer: {
		borderRadius: 8
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center"
	}
});

const styles = StyleSheet.create({
	placeholder: {
		color: colors.grayText
	},
	value: {
		color: colors.black
	},
	container: {
		backgroundColor: colors.paperGray,
		// elevation: 4,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		marginHorizontal: Platform.select({ android: 2, ios: 20 })
	}
});

export default RectangularSelect;
