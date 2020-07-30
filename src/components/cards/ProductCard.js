import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity
} from "react-native";
import colors from "../../constants/colors";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import SmallButton from "../common/SmallButton";
import Text from "../common/Text";
import strings from "../../locales/strings";
import { TextInput } from "react-native";

const ProductCard = ({ item, passive, addToCart }) => {
	let name = `${item && item.name} ${item && item.description}`;
	let subName = `${strings.article}: ${item && item.sellerTin}`;
	let price = `${!!item.prices &&
		(item.prices.length > 1
			? `${item.prices[0].price} - ${
					item.prices[item.prices.length - 1].price
			  }`
			: item.prices[0].price)} сум`;
	const [count, setCount] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.nameWrapper}>
					<Text style={styles.name}>{name}</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Text style={styles.subName}>{subName}</Text>
						<Text style={styles.price}>{price}</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottom}>
				<View style={styles.firmWrapper}>
					<SimpleLineIcons name="briefcase" size={21} />
					<Text style={styles.firm}>
						{item.seller && item.seller.name}
					</Text>
				</View>
				<View style={styles.buttonWrapper}>
					{passive ? (
						<Text style={styles.quantity}>
							{item.prices && item.count} штук
						</Text>
					) : (
						<>
							<TextInput
								placeholder={"0"}
								value={count}
								style={styles.input}
								onChangeText={text => {
									setCount(text);
								}}
								keyboardType={"number-pad"}
							/>
							<TouchableOpacity
								onPress={() => {
									addToCart(count);
								}}
							>
								<SmallButton
									backColor={colors.dimGreen}
									iconName="shoppingcart"
								/>
							</TouchableOpacity>
						</>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		marginBottom: 15,
		elevation: 3,
		marginHorizontal: 20,
		backgroundColor: colors.white,
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
	},
	top: {
		flexDirection: "row",
		flex: 1
	},
	nameWrapper: { flex: 1 },
	name: {
		color: colors.darkViolet,
		fontFamily: "Rubik-Medium"
	},
	subName: { color: colors.lightGrayText },
	price: { color: colors.grayText, fontFamily: "Rubik-Medium" },
	bottom: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center"
	},
	firmWrapper: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1
	},
	firm: {
		color: colors.darkGrayBorder,
		fontSize: 14,
		marginHorizontal: 10
	},
	quantity: {
		fontFamily: "Rubik-Medium",
		color: colors.darkGrayBorder
	},
	buttonWrapper: {
		flexDirection: "row"
	},
	input: {
		borderRadius: 8,
		borderColor: colors.jeansBlue,
		borderWidth: 1,
		minWidth: 60,
		textAlign: "center",
		textAlignVertical: "center"
	}
});

export default ProductCard;
