import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../constants/colors";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import SmallButton from "../common/SmallButton";
import Text from "../common/Text";
import strings from "../../locales/strings";
import { TextInput } from "react-native";

const ProductCard = ({ item, passive, addToCart }) => {
	const [count, setCount] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.nameWrapper}>
					<Text style={styles.name}>
						{item && item.name} {item && item.description}
					</Text>
					<Text style={styles.subName}>
						{strings.article}: {item && item.sellerTin}
					</Text>
				</View>
				<Text style={styles.price}>
					{!!item.prices &&
						(item.prices.length > 1
							? `от ${item.prices[0].price}`
							: item.prices[0].price)}{" "}
					сум
				</Text>
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
							{item.prices && item.prices[0].count} штук
						</Text>
					) : (
						<>
							<TextInput
								placeholder={
									item.prices
										? item.prices[0].count.toString()
										: "0"
								}
								value={count}
								style={styles.input}
								onChangeText={setCount}
								keyboardType={"number-pad"}
							/>
							<TouchableWithoutFeedback onPress={addToCart}>
								<SmallButton
									backColor={colors.dimGreen}
									iconName="shoppingcart"
								/>
							</TouchableWithoutFeedback>
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
		paddingVertical: 10
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
