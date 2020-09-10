import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Dimensions,
	ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { string } from "react-native-redash";
import strings from "../../locales/strings";
import Modal from "react-native-modal";

const CustomPicker = ({
	items: initialItems,
	onValueChange,
	placeholder = "Select",
	value,
	recursive,
	children
}) => {
	const [expanded, setExpanded] = useState(false);
	const [parent, setParent] = useState("");
	const [items, setItems] = useState([]);
	let onPickerPress = () => {
		setExpanded(!expanded);
	};
	let onItemPress = e => {
		console.log({ e });
		setExpanded(false);
		setTimeout(() => {
			onValueChange && onValueChange(e.value);
		}, 1);
		setParent("");
	};

	let onParentPress = (e, i) => {
		let childs = items[i].children;
		if (!childs || childs.length === 0) {
			setExpanded(false);
			setTimeout(() => {
				onValueChange && onValueChange(e.value);
			}, 1);
			setParent("");
			return;
		}
		setParent(e);
		setItems(childs);
	};

	let formulateChildren = (tempParent = parent) => {
		if (tempParent === "") {
			return [];
		}
		let index = items.findIndex(el => el.value === tempParent.value);
		let hasChildren = index !== -1 && items[index].children.length > 0;
		if (hasChildren) {
			return items.slice(index + 1, index + items[index].children.length);
		}
		return [];
	};

	const buildTree = (ids, groups) => {
		let tree = groups
			.filter(group => {
				return ids.indexOf(group._id) >= 0;
			})
			.map(group => {
				let item = {
					value: group._id,
					label: group.nameRU
				};
				let children = buildTree(group.children, groups);
				if (children.length) item.children = children;
				return item;
			});
		return tree;
	};

	useEffect(() => {
		if (recursive) {
			let ids = initialItems
				.filter(group => {
					return group.main === true;
				})
				.map(item => {
					return item._id;
				});
			let all = buildTree(ids, initialItems);
			setItems(all);
			console.log({ all });
			return;
		}
		setItems(initialItems);
	}, [initialItems]);

	let actualItems = items;

	let val = !!value ? value : placeholder;
	if (!!value) {
		let actualVal = initialItems.find(e => e.value === value) || {};
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
			<Modal
				isVisible={expanded && actualItems.length !== 0}
				onDismiss={() => setExpanded(false)}
				onBackButtonPress={() => setExpanded(false)}
				onBackdropPress={() => setExpanded(false)}
			>
				<View style={styles.items}>
					<ScrollView>
						{recursive && (
							<TouchableOpacity
								onPress={() => onItemPress(parent)}
							>
								<Text
									style={{
										maxWidth: 240,
										fontSize: 16,
										fontWeight: "bold",
										paddingVertical: 2
									}}
								>
									{strings.all}
								</Text>
							</TouchableOpacity>
						)}
						{actualItems.map((e, i) => {
							return (
								<TouchableOpacity
									onPress={() =>
										recursive
											? onParentPress(e, i)
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
											maxWidth: 240,
											fontSize: 16,
											fontWeight: "bold",
											paddingVertical: 10
										}}
									>
										{e.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

export default CustomPicker;

const styles = StyleSheet.create({
	container: {
		zIndex: 999
	},
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
		// maxWidth: 400,
		maxHeight: Dimensions.get("window").height - 200,
		elevation: 2,
		backgroundColor: colors.white,
		position: "absolute",
		right: 0,
		// minWidth: 300,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		},
		zIndex: -1000
	},
	icon: {
		margin: 10
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		paddingVertical: 10
	}
});
