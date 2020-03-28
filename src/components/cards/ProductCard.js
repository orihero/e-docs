import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import SmallButton from "../common/SmallButton";
import Text from "../common/Text";

const ProductCard = ({ item, passive }) => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.nameWrapper}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.subName}>{item.subName}</Text>
				</View>
				<Text style={styles.price}>{item.price} сум</Text>
			</View>
			<View style={styles.bottom}>
				<View style={styles.firmWrapper}>
					<SimpleLineIcons name="briefcase" size={21} />
					<Text style={styles.firm}>{item.firmName}</Text>
				</View>
				<View style={styles.buttonWrapper}>
					{passive ? (
						<Text style={styles.quantity}>
							{item.quantity} штук
						</Text>
					) : (
						<>
							<SmallButton
								backColor={colors.white}
								borderColor={colors.jeansBlue}
								text={item.quantity}
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
		alignItems: "center"
	},
	firm: {
		color: colors.darkGrayBorder,
		fontSize: 14,
		marginLeft: 10
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
