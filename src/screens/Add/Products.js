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

let percent = (first, second) => first * (second / 100);
let multipy = (first, second) => first * second;

let add = (first, second) => first + second;

let calculatedFields = {
	deliverysum: {
		firstField: "count",
		secondField: "summa",
		calculator: multipy
	},
	vatsum: {
		firstField: "vatrate",
		secondField: "totalsum",
		fallbackField: "deliverysum",
		calculator: percent
	},
	deliverysumwithvat: {
		firstField: "vatsum",
		secondField: "deliverysum",
		fallbackField: "totalsum",
		calculator: add
	},
	fuelsum: {
		firstField: "fuelrate",
		secondField: "deliverysum",
		fallbackField: "totalsum",
		calculator: percent
	},
	deliverysumwithfuel: {
		firstField: "fuelsum",
		fallbackField: "totalsum",
		secondField: "totalsumwithvat",
		calculator: add
	},
	totalsum: {
		firstField: "count",
		secondField: "summa",
		calculator: multipy
	},
	totalsumwithvat: {
		firstField: "totalsum",
		secondField: "vatsum",
		calculator: multipy
	}
};

let reflectiveFields = {
	count: {
		results: [
			"deliverysum",
			"deliverysumwithvat",
			"deliverysumwithfuel",
			"totalsum",
			"totalsumwithvat"
		],
		secondField: "summa",
		calculator: percent
	},
	summa: {
		results: [
			"deliverysum",
			"deliverysumwithvat",
			"deliverysumwithfuel",
			"totalsum",
			"totalsumwithvat"
		],
		secondField: "count",
		calculator: percent
	},
	vatrate: {
		results: [
			"vatsum",
			"totalsumwithvat",
			"deliverysumwithvat",
			"deliverysumwithfuel"
		],
		secondField: "count",
		calculator: percent
	},
	fuelrate: {
		results: ["fuelsum", "deliverysumwithvat", "deliverysumwithfuel"],
		secondField: "count",
		calculator: percent
	}
};

const Products = ({ navigation }) => {
	let model = navigation.getParam("model");
	let initialProducts = navigation.getParam("products") || [];
	//TODO optimize by removing in focus and use onBlur only
	let defaultTemp = {
		index: -1,
		key: "",
		value: ""
	};
	const [products, setProducts] = useState([
		...initialProducts,
		{ ...model }
	]);
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
	let onBlur = key => {
		setTempValue(defaultTemp);
		let tempProducts = products.filter((temp, i) => {
			if (i === tempValue.index) {
				temp[key] = tempValue.value;
				let reflectiveField = reflectiveFields[key];
				if (!!reflectiveField) {
					reflectiveField.results.forEach(field => {
						if (model[field] === undefined || model[field] === null)
							return;
						let calculatedField = calculatedFields[field];
						let result =
							calculatedField.calculator(
								!!parseFloat(temp[calculatedField.firstField])
									? parseFloat(
											temp[calculatedField.firstField]
									  )
									: parseFloat(
											temp[calculatedField.fallbackField]
									  ),
								!!parseFloat(temp[calculatedField.secondField])
									? parseFloat(
											temp[calculatedField.secondField]
									  )
									: parseFloat(
											temp[calculatedField.fallbackField]
									  )
							) || "";
						temp[field] = result.toString();
						console.log({
							result,
							field,
							1: calculatedField.firstField,
							2: calculatedField.secondField
						});
					});
				}
			}
			return temp;
		});
		setProducts(tempProducts);
	};
	let renderProduct = (productModel, index) => {
		return (
			<View style={styles.productContainer}>
				{Object.keys(productModel).map(key => {
					let type = typeof model[key];
					if (key === "ordno") {
						return (
							<Text style={styles.title}>
								{strings.product} № {index + 1}
							</Text>
						);
					}
					let isAutCalculated = !!calculatedFields[key];
					if (isAutCalculated) {
						return (
							<RectangularInput
								placeholder={strings[key.toUpperCase()] || key}
								containerStyle={{
									marginVertical: 5
								}}
								value={productModel[key]}
								editable={false}
							/>
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
									title={strings[key.toUpperCase()] || key}
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
								let val = productModel[key] || "";
								return (
									<RectangularSelect
										placeholder={strings.measure}
										value={val}
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
						default: {
							let val = productModel[key] || "";
							return (
								<RectangularInput
									placeholder={
										strings[key.toUpperCase()] || key
									}
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
											: typeof val !== "string"
											? val.toString()
											: val
									}
									onChange={value =>
										setTempValue({
											...tempValue,
											value
										})
									}
									onBlur={() => onBlur(key)}
								/>
							);
						}
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
		padding: 15,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
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
