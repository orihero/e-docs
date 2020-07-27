import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { string } from "react-native-redash";
import strings from "../../locales/strings";

const CustomPicker = ({
	items,
	onValueChange,
	placeholder = "Select",
	value,
	recursive,
	children
}) => {
	const [expanded, setExpanded] = useState(false);
	const [parent, setParent] = useState("");
	let onPickerPress = () => {
		setExpanded(!expanded);
	};
	let onItemPress = e => {
		onValueChange && onValueChange(e.value);
		setParent("");
		setExpanded(false);
	};

	let onParentPress = e => {
		let childs = formulateItems();
		if (childs.length === 0) {
			onValueChange && onValueChange(e.value);
			setParent("");
			setExpanded(false);
			return;
		}
		setParent(e);
	};

	let formulateItems = (tempParent = parent) => {
		if (!tempParent) {
			return items.filter(e => e.main);
		}
		let index = items.findIndex(el => el.value === tempParent.value) || -1;
		console.warn({ tempParent });
		if (index !== -1) {
			return items.slice(index + 1, index + items[index].children.length);
		}
		return items.filter(e => e.main);
	};

	let actualItems = recursive ? formulateItems(parent) : items;

	let val = !!value ? value : placeholder;
	if (!!value) {
		let actualVal = items.find(e => e.value === value) || {};
		val = actualVal.label;
	}
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={onPickerPress}>
				{!!children ? (
					children
				) : (
					<View style={styles.row}>
						<Text
							style={[
								!!value ? styles.value : styles.placeholder
							]}
						>
							{val}
						</Text>
						<Icon
							name={"arrow-down"}
							style={styles.icon}
							size={16}
						/>
					</View>
				)}
			</TouchableWithoutFeedback>
			{expanded && actualItems.length !== 0 && (
				<View style={styles.items}>
					{recursive && (
						<TouchableOpacity onPress={() => onItemPress(parent)}>
							<Text
								style={{
									maxWidth: 240
								}}
							>
								{strings.all}
							</Text>
						</TouchableOpacity>
					)}
					{actualItems.map(e => {
						return (
							<TouchableOpacity
								onPress={() =>
									recursive
										? onParentPress(e)
										: onItemPress(e)
								}
								style={[recursive && styles.item]}
							>
								{recursive && (
									<AntDesign
										name="right"
										style={{
											alignSelf: "center",
											right: 0
										}}
									/>
								)}
								<Text
									style={{
										maxWidth: 240
									}}
								>
									{e.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default CustomPicker;

const styles = StyleSheet.create({
	container: {},
	value: {
		color: colors.darkViolet,
		fontWeight: "bold"
	},
	placeholder: {},
	row: {
		flexDirection: "row",
		alignItems: "center"
	},
	items: {
		margin: 10,
		padding: 20,
		maxWidth: 400,
		maxHeight: Dimensions.get("window").height - 200,
		elevation: 2,
		backgroundColor: colors.white,
		position: "absolute",
		right: 0,
		minWidth: 300,
		zIndex: 1000
	},
	icon: {
		margin: 10
	},
	item: {
		flexDirection: "row",
		// justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap"
	}
});
