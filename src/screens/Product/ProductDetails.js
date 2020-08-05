import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import strings from "../../locales/strings";
import Seller from "./Seller";
import SingleProducts from "./SingleProducts";
import colors from "../../constants/colors";

let fields = [];

let { width } = Dimensions.get("window");

const ProductDetails = ({ navigation }) => {
	let product = navigation.getParam("item");
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "1", title: strings.product },
		{ key: "2", title: strings.seller }
	]);

	const renderScene = SceneMap({
		1: props => <SingleProducts {...props} item={product} />,
		2: props => <Seller {...props} sellerTin={product.sellerTin} />
	});
	return (
		<View style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				style={{ backgroundColor: colors.white, flex: 1 }}
				sceneContainerStyle={{
					backgroundColor: colors.white,
					flex: 1
				}}
				initialLayout={{ width }}
				renderTabBar={props => (
					<TabBar
						scrollEnabled={true}
						indicatorStyle={{
							backgroundColor: colors.gold,
							height: 1
						}}
						tabStyle={{ width: width / 2 }}
						labelStyle={{ color: colors.jeansBlue, fontSize: 14 }}
						style={{ backgroundColor: colors.white }}
						{...props}
					/>
				)}
			/>
		</View>
	);
};

export default ProductDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});
