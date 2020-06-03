import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RectangularInput from "../../components/common/RectangularInput";
import DefaultCheckbox from "../../components/common/DefaultCheckbox";
import strings from "../../locales/strings";
import colors from "../../constants/colors";

const Products = ({ navigation }) => {
	let model = navigation.getParam("model");
	//TODO optimize by removing in focus and use onBlur only
	let defaultTemp = {
		index: -1,
		key: "",
		value: ""
	};
	const [products, setProducts] = useState([model]);
	const [tempValue, setTempValue] = useState(defaultTemp);
	let renderProduct = (productModel, index) => {
		console.log({ productModel });
		return Object.keys(productModel).map(key => {
			let type = typeof model[key];
			switch (type) {
				case "boolean":
					return (
						<DefaultCheckbox
							title={strings[key] || key}
							value={productModel[key]}
						/>
					);
				default:
					return (
						<RectangularInput
							placeholder={strings[key] || key}
							containerStyle={{ marginVertical: 5 }}
							onFocus={() => {
								setTempValue({
									index,
									key,
									value: products[index][key]
								});
							}}
							value={
								tempValue.key === key &&
								index === tempValue.index
									? tempValue.value
									: productModel[key]
							}
							onChange={value =>
								setTempValue({ ...tempValue, value })
							}
							onBlur={() => {
								setTempValue(defaultTemp);
								let temp = products.filter((e, i) => {
									if (i === tempValue.index) {
										e[key] = tempValue.value;
									}
									return e;
								});
								setProducts(temp);
							}}
						/>
					);
			}
		});
	};
	return (
		<ScrollView>
			<View style={styles.container}>{products.map(renderProduct)}</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: colors.lightBlueBackground
	}
});

export default Products;
