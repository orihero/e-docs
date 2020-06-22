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
import { normalizeFilters } from "../../utils/object";
import { cartLoaded } from "../../redux/actions/cart";

const Product = ({
	navigation,
	hideModal,
	showModal,
	hideMessage,
	showMessage,
	token,
	cart,
	cartLoaded
}) => {
	let [filters, setFilters] = useState({ page: 1, limit: 20, group: "" });
	let [groups, setGroups] = useState([]);
	let { products } = cart;
	let getProducts = async () => {
		showModal(strings.gettingProducts);
		try {
			let res = await requests.product.getProducts(
				token,
				normalizeFilters(filters)
			);
			cartLoaded({ ...cart, products: res.json().docs });
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
		try {
			let res = await requests.product.getTypes();
			setGroups(
				res.json().map(e => ({
					label: e.nameRU,
					value: e._id,
					...e
				}))
			);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
	};

	useEffect(() => {
		getProducts();
	}, [filters]);

	let addToCart = async () => {
		let res = await requests.product.addToCart();
		// cartLoaded({});
	};
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
						<ProductCard
							addToCart={addToCart}
							item={item}
							passive={!!cart[item._id]}
							key={item.id}
						/>
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

let mapStateToProps = ({ user, cart }) => {
	return {
		token: user.token,
		cart
	};
};
let mapDispatchToProps = {
	showMessage,
	showModal,
	hideMessage,
	hideModal,
	cartLoaded
};

let ConnectedProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);

export default withNavigation(ConnectedProduct);
