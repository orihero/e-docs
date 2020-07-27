import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import InnerHeader from "../../components/navigation/InnerHeader";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import ProductCard from "../../components/cards/ProductCard";
import RectangleButton from "../../components/common/RectangleButton";
import Text from "../../components/common/Text";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import requests from "../../api/requests";
import { connect } from "react-redux";
import {
	hideMessage,
	hideModal,
	showMessage,
	showModal
} from "../../redux/actions";

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

const Checkout = ({ navigation, token, showMessage, showModal, hideModal }) => {
	const [orders, setOrders] = useState([]);
	const onOrderPress = async () => {
		showModal();
		let res = await requests.product.cardOrder(token);
		console.warn(res);
		await effect();
		showMessage({
			type: colors.green,
			message: strings.createdSuccessfully
		});
		hideModal();
	};

	let effect = async () => {
		let res = await requests.product.getCart(token);
		let data = res.json();
		setOrders(data.docs);
	};

	useEffect(() => {
		effect();
	}, []);

	let onClearPress = async () => {
		showModal();
		await requests.product.clearCart(token);
		showMessage({
			type: colors.green,
			message: strings.deletedSuccessfully
		});
		await effect();
		hideModal();
	};

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
					data={orders}
					renderItem={({ item }) => (
						<ProductCard item={item} key={item.id} passive={true} />
					)}
					keyExtractor={item => item.id}
				/>
			</View>
			<View style={styles.bottom}>
				{/* <View style={styles.totalWrapper}>
					<Text style={styles.total}>{strings.overAll}</Text>
					<Text style={styles.total}>{orders.reduce((prev,current)=>{
						return prev+(parseFloat(current.
					},0)}</Text>
				</View> */}
				<View style={styles.buttonWrapper}>
					<RectangleButton
						onPress={onOrderPress}
						text={strings.sendApplication}
						backColor={colors.dimGreen}
					/>
					<RectangleButton
						onPress={onClearPress}
						text={strings.clear}
						backColor={colors.killerRed}
						style={{
							startColor: "red",
							endColor: colors.killerRed,
							marginVertical: 10
						}}
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

let mapStateToProps = ({ user, cart }) => {
	return {
		token: user.token,
		cart
	};
};
const mapDispatchToProps = {
	showMessage,
	showModal,
	hideModal
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNavigation(Checkout));
