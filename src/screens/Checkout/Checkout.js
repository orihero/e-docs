import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import requests from "../../api/requests";
import ProductCard from "../../components/cards/ProductCard";
import RectangleButton from "../../components/common/RectangleButton";
import InnerHeader from "../../components/navigation/InnerHeader";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import { hideModal, showMessage, showModal } from "../../redux/actions";

const Checkout = ({
	navigation,
	token,
	showMessage,
	showModal,
	hideModal,
	modalVisible
}) => {
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
		showModal(strings.loading);
		try {
			let res = await requests.product.getCart(token);
			let data = res.json();
			setOrders(data.docs);
		} catch (error) {}
		hideModal();
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
					refreshing={modalVisible}
					onRefresh={effect}
					refreshControl={
						<RefreshControl
							refreshing={modalVisible}
							onRefresh={effect}
						/>
					}
				/>
			</View>
			<View style={styles.bottom}>
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

let mapStateToProps = ({ user, cart, appState: { modalVisible } }) => {
	return {
		token: user.token,
		cart,
		modalVisible
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
