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
	cartLoaded,
	modalVisible
}) => {
	let [filters, setFilters] = useState({ page: 1, limit: 20, group: "" });
	let [groups, setGroups] = useState([]);
	let { products = [] } = cart;
	const [group, setGroup] = useState("");
	let getProducts = async () => {
		showModal(strings.gettingProducts);
		try {
			let f = normalizeFilters(filters);
			console.warn({ f, products });
			let res = await requests.product.getProducts(token, f);
			cartLoaded({
				...cart,
				products: res.json().docs
			});
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
		try {
			let res = await requests.product.getTypes();
			let results = res.json().map(e => ({
				label: e.nameRU,
				value: e._id,
				...e
			}));
			setGroups(results);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
	};

	useEffect(() => {
		getProducts();
	}, [filters]);

	let onCategoryChange = el => {
		setGroup(el);
		cartLoaded({ ...cart, products: [] });
		setFilters({ ...filters, group: el, page: 1 });
		console.warn({ el });
	};

	let addToCart = async (item, count) => {
		showModal();
		let data = {
			itemId: item._id,
			count: count
		};
		let res = await requests.product.addToCart(token, data);
		showMessage({
			type: colors.green,
			message: `${item.name} ${strings.added}`
		});
		hideModal();
		// cartLoaded({});
	};

	let onEndReached = () => {
		let page = Math.ceil(products.length / filters.limit) + 1;
		if (page === filters.page) return;
		setFilters({
			...filters,
			page
		});
	};

	let onRefresh = () => {
		cartLoaded({ ...cart, products: [] });
		setFilters({ ...filters, group: "", page: 1 });
	};
	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={strings.products}
				showTypes={groups}
				setShowType={onCategoryChange}
				showType={group}
				recursive
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
							addToCart={count => addToCart(item, count)}
							item={item}
							passive={!!cart[item._id]}
							key={item.id}
						/>
					)}
					onRefresh={onRefresh}
					refreshing={modalVisible}
					keyExtractor={item => item.id}
					// onEndReachedThreshold={0.9}
					// onEndReached={onEndReached}
					style={{ flex: 1 }}
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
		right: 15,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
	}
});

let mapStateToProps = ({ user, cart, appState: { modalVisible } }) => {
	return {
		token: user.token,
		cart,
		modalVisible
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
