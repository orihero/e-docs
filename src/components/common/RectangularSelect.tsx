import React from "react";
import { StyleSheet, View } from "react-native";
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
	placeholder,
	containerStyle,
	disabled = false,
	items = [],
	onChange = () => {},
	value
}: RectangularSelectProps) => {
	// let val = placeholder
	// if (value !== null && value !== undefined && items[value]){

	// }
	let val =
		value !== null && value !== undefined
			? items[value]
				? items[value].label
				: items.find(e => {
						return e.actualValue === value;
				  })?.label
			: placeholder;
	return (
		<Picker
			style={styles.container}
			onValueChange={e => {
				onChange(e);
			}}
			disabled={disabled}
			value={value}
			placeholder={{ label: placeholder, value: -1, color: colors.gray }}
			items={items}
		>
			<View style={[styles.container, containerStyle]}>
				<Text style={[styles.placeholder, value && styles.value]}>
					{val}
				</Text>
				<Icons name={"down"} size={18} color={colors.gray} />
			</View>
		</Picker>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		backgroundColor: colors.white,
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		elevation: 4
	},
	placeholder: {
		color: colors.grayText
	},
	value: {
		color: colors.black
	}
});

export default RectangularSelect;
