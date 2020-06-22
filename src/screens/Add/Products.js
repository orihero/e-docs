import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback
} from "react-native";
import RectangularInput from "../../components/common/RectangularInput";
import DefaultCheckbox from "../../components/common/DefaultCheckbox";
import strings from "../../locales/strings";
import colors from "../../constants/colors";
import Text from "../../components/common/Text";
import Feather from "react-native-vector-icons/Feather";
import RectangularSelect from "../../components/common/RectangularSelect";
import requests from "../../api/requests";
import RectangleButton from "../../components/common/RectangleButton";

const Products = ({ navigation }) => {
	let model = navigation.getParam("model");
	//TODO optimize by removing in focus and use onBlur only
	let defaultTemp = {
		index: -1,
		key: "",
		value: ""
	};
	const [products, setProducts] = useState([{ ...model }]);
	const [tempValue, setTempValue] = useState(defaultTemp);
	const [list, setList] = useState([]);
	const [withoutVat, setWithoutVat] = useState(false);
	useEffect(() => {
		requests.doc.getMeasures().then(res => {
			setList(
				res.json().map(e => ({
					label: strings.getLanguage() === "ru" ? e.nameRU : e.nameUZ,
					value: e.measureId
				}))
			);
		});
	}, []);
	let renderProduct = (productModel, index) => {
		return (
			<View style={styles.productContainer}>
				{Object.keys(productModel).map(key => {
					let type = typeof model[key];
					if (key === "orderno") {
						return (
							<Text style={styles.title}>
								{strings.product} № {index + 1}
							</Text>
						);
					}
					switch (type) {
						case "boolean":
							if (!withoutVat) return null;
							return (
								<DefaultCheckbox
									style={{
										margin: 10,
										marginHorizontal: 0
									}}
									title={strings[key] || key}
									isActive={productModel[key]}
									toggle={val =>
										setProducts(
											products.filter((e, i) => {
												if (i === index) {
													e[key] = val;
												}
												return e;
											})
										)
									}
								/>
							);
						case "string":
						case "number": {
							if (key.endsWith("id")) {
								return (
									<RectangularSelect
										placeholder={strings.measure}
										value={productModel[key]}
										items={list}
										onChange={val =>
											setProducts(
												products.filter((e, i) => {
													if (i === index) {
														e[key] = val;
													}
													return e;
												})
											)
										}
										style={{
											marginHorizontal: 15
										}}
									/>
								);
							}
						}
						default:
							return (
								<RectangularInput
									placeholder={strings[key] || key}
									containerStyle={{
										marginVertical: 5
									}}
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
										setTempValue({
											...tempValue,
											value
										})
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
				})}
			</View>
		);
	};

	let addProduct = () => {
		console.log("ADDING MODEL ", { model });

		setProducts([...products, model]);
	};

	let onComplete = () => {
		navigation.navigate("Add", {
			productList: { hasVat: !withoutVat, products }
		});
	};
	let onCancel = () => {
		navigation.navigate("Add");
	};
	return (
		<View>
			<ScrollView>
				<View style={styles.container}>
					<DefaultCheckbox
						style={{ margin: 10, marginHorizontal: 0 }}
						title={strings.withoutVat}
						isActive={withoutVat}
						toggle={setWithoutVat}
					/>
					{products.map(renderProduct)}
					<View style={styles.row}>
						<RectangleButton
							backColor={colors.white}
							text={strings.cancel}
							onPress={onCancel}
							style={{
								marginTop: 20,
								// paddingVertical: 25,
								marginHorizontal: 20,
								startColor: colors.grayText,
								endColor: colors.grayBorder
							}}
						/>
						<RectangleButton
							backColor={colors.white}
							text={strings.save}
							onPress={onComplete}
							style={{
								marginTop: 20,
								// paddingVertical: 25,
								marginHorizontal: 20
							}}
						/>
					</View>
				</View>
			</ScrollView>
			<View style={styles.roundButtonContainer}>
				<TouchableWithoutFeedback onPress={addProduct}>
					<View style={styles.roundButton}>
						<Feather name="plus" size={36} color={colors.white} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: colors.lightBlueBackground,
		paddingBottom: 80
	},
	productContainer: {
		backgroundColor: colors.lightBlueBackground,
		elevation: 4,
		marginVertical: 10,
		paddingBottom: 15,
		padding: 15
	},
	title: {
		fontSize: 18
	},
	roundButtonContainer: {
		position: "absolute",
		bottom: 15,
		right: 15
	},
	roundButton: {
		width: 60,
		height: 60,
		backgroundColor: colors.violet,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 60
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default Products;
