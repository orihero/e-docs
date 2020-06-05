import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Picker from "@react-native-community/datetimepicker";
import Text from "./Text";
import Icons from "react-native-vector-icons/AntDesign";
import colors from "../../constants/colors";
import { TextInput } from "react-native-paper";

interface DatePickerProps {
	placeholder?: string;
	containerStyle?: Object;
	disabled?: boolean;
	items?: any[];
	onChange?: Function;
	value?: string;
}

const RectangularDatePicker = ({
	placeholder,
	containerStyle,
	items = [],
	onChange = () => {},
	value
}: DatePickerProps) => {
	let normalize = selection => {
		let selectedDate = selection || new Date();
		let day =
			selectedDate.getDate() >= 10
				? selectedDate.getDate().toString()
				: "0" + selectedDate.getDate().toString();
		let year = selectedDate.getFullYear();
		let month =
			selectedDate.getMonth() >= 10
				? (selectedDate.getMonth() + 1).toString()
				: "0" + (selectedDate.getMonth() + 1).toString();

		let date = `${day}.${month}.${year}`;
		return date;
		return date;
	};
	const [visible, setVisible] = useState(false);
	return (
		<TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
			<View>
				<View style={[styles.container, containerStyle]}>
					<Text style={[styles.placeholder, value && styles.value]}>
						{value ? value : placeholder}
					</Text>
					<Icons name={"down"} size={18} color={colors.grayText} />
				</View>
				{visible && (
					<Picker
						value={Date.now()}
						onChange={(e, selectedDate) => {
							setVisible(false);
							onChange(normalize(selectedDate || Date.now()));
						}}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		backgroundColor: colors.paperGray,
		padding: 28,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// elevation: 4,
		paddingBottom: 18,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderBottomWidth: 1,
		borderColor: colors.lightGrayText,
		marginRight: 15
	},
	placeholder: {
		color: colors.grayText
	},
	value: {
		color: colors.black
	}
});

export default RectangularDatePicker;
