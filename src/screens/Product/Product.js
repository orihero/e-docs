import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	TouchableOpacity
} from "react-native";
import InnerHeader from "../../components/navigation/InnerHeader";
import ProductCard from "../../components/cards/ProductCard";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Entypo from "react-native-vector-icons/Entypo";
import { withNavigation } from "react-navigation";
import {
	hideModal,
	showModal,
	hideMessage,
	showMessage
} from "../../redux/actions";
import { connect } from "react-redux";
import requests from "../../api/requests";

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

const Product = ({
	navigation,
	hideModal,
	showModal,
	hideMessage,
	showMessage,
	token
}) => {
	let [filters, setFilters] = useState({});
	let [groups, setGroups] = useState(productList);

	let [products, setProducts] = useState([]);
	let getProducts = async () => {
		showModal(strings.gettingProducts);
		try {
			let res = await requests.product.getProducts(token, 1, 20);
			setProducts(res.json().docs);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
		try {
			let res = await requests.product.getTypes();
			setGroups(res.json().map());
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
	};
	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		getProducts();
	}, [filters]);
	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={strings.products}
				showTypes={groups}
				setShowType={setFilters}
			/>
			<View style={styles.cardWrapper}>
				<FlatList
					contentContainerStyle={{
						paddingTop: 10
					}}
					showsVerticalScrollIndicator={false}
					data={products}
					renderItem={({ item }) => (
						<ProductCard item={item} key={item.id} />
					)}
					keyExtractor={item => item.id}
				/>
			</View>
			<TouchableWithoutFeedback
				onPress={() => {
					navigation.navigate("Checkout");
				}}
			>
				<View style={styles.singleButton}>
					<Entypo
						name="shopping-cart"
						size={25}
						color={colors.dimGreen}
					/>
				</View>
			</TouchableWithoutFeedback>
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
	singleButton: {
		padding: 15,
		backgroundColor: colors.white,
		elevation: 3,
		borderRadius: 40,
		position: "absolute",
		bottom: 10,
		right: 15
	}
});

let mapStateToProps = ({ user }) => {
	return {
		token: user.token
	};
};
let mapDispatchToProps = {
	showMessage,
	showModal,
	hideMessage,
	hideModal
};

let ConnectedProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);

export default withNavigation(ConnectedProduct);
