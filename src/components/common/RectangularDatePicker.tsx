import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Picker from "@react-native-community/datetimepicker";
import Text from "./Text";
import Icons from 'react-native-vector-icons/AntDesign'
import colors from "../../constants/colors";

interface DatePickerProps {
	placeholder?: string;
	containerStyle?: Object;
	disabled?: boolean;
	items?: any[];
	onChange?: Function;
	value?: string;
}

const RectangularDatePicker = ({
	placeholder ,
	containerStyle,
	items = [],
	onChange = () => {},
	value
}: DatePickerProps) => {
	let normalize = selectedDate => {
		let date = `${selectedDate?.getFullYear()}-${
			selectedDate?.getMonth() >= 10
				? selectedDate?.getMonth().toString()
				: "0" + selectedDate?.getMonth().toString()
		}-${
			selectedDate?.getDate() >= 10
				? selectedDate?.getDate().toString()
				: "0" + selectedDate?.getDate().toString()
		}`;
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
					<Icons
						name={"down"}
						size={18}
						color={colors.grayText}
					/>
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
		borderRadius: 8,
		backgroundColor: colors.white,
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		elevation:4
	},
	placeholder: {
		color: colors.gray
	},
	value: {
		color: colors.black
	}
});

export default RectangularDatePicker;
