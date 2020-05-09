import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import SmallButton from "../common/SmallButton";
import Text from "../common/Text";
import strings from "../../locales/strings";

// const example = {
// 	_id: "5e57e4cea103051b30c0f803",
// 	active: true,
// 	code: "1",
// 	createdAt: "2020-02-27T15:48:30.985Z",
// 	description: "Очень чистая вода",
// 	groupId: 189,
// 	measureId: "1",
// 	name: "Вода 1.5л чистая",
// 	pack: 1,
// 	prices: [{ count: 1, price: 3500 }],
// 	seller: {
// 		_id: "5db7e15b79e7e011e4b3093e",
// 		delivery: true,
// 		name: '"FIDES PROJECTS" XK',
// 		pickup: false,
// 		seller: true,
// 		tin: "302204416"
// 	},
// 	sellerTin: "302204416",
// 	updatedAt: "2020-02-27T15:48:30.985Z",
// 	withoutVat: false
// };

const ProductCard = ({ item, passive }) => {
	console.warn(item);
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
					{item.prices && item.prices[0].price} сум
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
							<SmallButton
								backColor={colors.white}
								borderColor={colors.jeansBlue}
								text={item.prices && item.prices[0].count}
							/>
							<SmallButton
								backColor={colors.dimGreen}
								iconName="shoppingcart"
							/>
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
	}
});

export default ProductCard;