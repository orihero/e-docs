import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import InnerHeader from "../../components/navigation/InnerHeader";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import ProductCard from "../../components/cards/ProductCard";
import RectangleButton from "../../components/common/RectangleButton";
import Text from "../../components/common/Text";

let productList = [
	{
		id: "1",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "2",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "3",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "4",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "5",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "6",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		type: "soap",
		quantity: "12"
	},
	{
		id: "7",
		name: "Body BOOM, мыло для рук грейпфрукт 380 мл",
		price: 118200,
		subName: "арт 36434",
		firmName: "Fides Projects",
		quantity: "12",
		type: "soap"
	}
];

const Checkout = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={strings.products}
			/>
			<View style={styles.cardWrapper}>
				<FlatList
					contentContainerStyle={{
						paddingTop: 10
					}}
					showsVerticalScrollIndicator={false}
					data={productList}
					renderItem={({ item }) => (
						<ProductCard item={item} key={item.id} passive={true} />
					)}
					keyExtractor={item => item.id}
				/>
			</View>
			<View style={styles.bottom}>
				<View style={styles.totalWrapper}>
					<Text style={styles.total}>{strings.overall}</Text>
					<Text style={styles.total}>1 834 200 сум</Text>
				</View>
				<View style={styles.buttonWrapper}>
					<RectangleButton
						text={strings.sendApplication}
						backColor={colors.dimGreen}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	cardWrapper: {
		flex: 1
	},
	bottom: {
		right: 0,
		left: 0,
		position: "absolute",
		bottom: 0,
		flex: 1,
		backgroundColor: colors.white,
		padding: 20
	},
	totalWrapper: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between"
	},
	total: {
		color: colors.darkViolet,
		fontFamily: "Rubik-Medium"
	},
	buttonWrapper: { flex: 1, paddingHorizontal: 40, paddingTop: 20 }
});

export default withNavigation(Checkout);
