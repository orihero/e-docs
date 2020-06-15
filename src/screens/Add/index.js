import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import RectangularSelect from "../../components/common/RectangularSelect";
import Text from "../../components/common/Text";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import * as types from "../../docTypes";
import {
	actGoodsAcceptanceFields,
	actWorkPerformedFields,
	actWorkPerformedProduct,
	actWorkPerformedDoc
} from "../../docTypes";
import strings from "../../locales/strings";
import { connect } from "react-redux";
import RectangleButton from "../../components/common/RectangleButton";
import { convertToTypeOf } from "../../utils/object";
import signProvider from "../../utils/signProvider";
import requests from "../../api/requests";

const mapStateToProps = ({ user }) => ({ user });

const Add = connect(mapStateToProps)(({ navigation, user }) => {
	const [fields, setFields] = useState([]);
	const [docType, setDocType] = useState(-1);
	let productList = navigation.getParam("productList") || [];
	useEffect(() => {
		if (docType.fields) {
			setFields(docType.fields);
		} else {
			setFields([]);
		}
	}, [docType]);
	let docTypes = [
		{
			label: "Доверенность",
			value: 1,
			actualValue: {
				doc: types.empowermentDoc,
				productModel: types.empowermentProduct
			}
		},
		{
			label: "Акт выполненных работ",
			value: {
				fields: actWorkPerformedFields,
				productModel: actWorkPerformedProduct,
				doc: actWorkPerformedDoc,
				docType: "actWorkPerformed"
			}
		},
		{
			label: "Акт приема-передачи",
			value: {
				fields: actGoodsAcceptanceFields,
				productModel: types.actGoodsAcceptanceProduct,
				doc: types.actGoodsAcceptanceDoc
			}
		},
		{
			label: "Товарно транспортная накладная",
			value: 4,
			actualValue: {
				doc: types.actWorkPerformedDoc
			}
		},
		{
			label: "Заказ",
			value: 5,
			actualValue: {
				doc: types.actWorkPerformedDoc,
				productModel: types.actWorkPerformedDocProduct,
				entity: types.actWorkPerformedDocEntity
			}
		},
		{
			label: "Универсальный документ ",
			value: 6,
			actualValue: {
				doc: types.actWorkPerformedDoc,
				entity: types.actWorkPerformedDocEntity
			}
		}
	];

	/**
	 ** Creation of document
	 * @param {any} data Gathered after the completion of form
	 */
	let onCreate = async data => {
		//TODO start loading
		//* Model for the product
		let productModel = docType.productModel;
		//* Model for the document
		let doc = docType.doc;
		//? Validation
		//* Since React-native input generate only string we have to parse all the string to corresponding data type
		let parsedProducts = productList.products.map(product => {
			let parsedProduct = Object.keys(product).reduce((prev, key) => {
				return {
					...prev,
					[key]: convertToTypeOf(productModel[key], product[key])
				};
			}, {});
			return parsedProduct;
		});
		//* Temporary submit data
		let temp = {
			...data,
			productlist: { ...productList, products: parsedProducts }
		};
		console.log({ parsedProducts });
		//* Make sure that submit data is similar to document model
		let submitData = Object.keys(doc).reduce((prev, key) => {
			return { ...prev, [key]: temp[key] };
		}, {});

		try {
			console.log("SENDING REQUEST TO CREATE", { submitData });
			let res = await requests.doc.create(
				user.token,
				docType.docType,
				submitData
			);
			console.log({ response: res.json() });
		} catch (error) {
			//TODO show error message
			console.log(error);
		}
		console.log("SEND COMPLETE");
		//TODO stop loading
		//TODO show success message
		// let sign = await signProvider.sign(JSON.stringify(submitData));
	};

	let footer = ({ getSubmitData }) => {
		return (
			<View>
				{!!docType && !!docType.productModel && (
					<View style={styles.productsWrapper}>
						<View style={styles.productsContainer}>
							<Text style={styles.inputTitle}>
								{strings.products}
							</Text>
							<Text style={styles.inputTitle}>
								{productList.products
									? productList.products.length
									: 0}
							</Text>
						</View>
						<TouchableWithoutFeedback
							onPress={() => {
								navigation.navigate("Products", {
									model: docType.productModel || {}
								});
							}}
						>
							<View style={styles.button}>
								<Text style={styles.inputTitle}>
									{strings.edit || "Edit   "}
								</Text>
								<AntDesign
									name={"edit"}
									size={20}
									color={colors.green}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
				)}
				{!!docType.fields && (
					<RectangleButton
						backColor={colors.white}
						text={strings.create}
						onPress={() => onCreate(getSubmitData())}
						style={{
							marginTop: 20,
							marginHorizontal: 20
						}}
					/>
				)}
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ padding: 15 }}
			>
				<RectangularSelect
					value={docType}
					items={docTypes}
					placeholder={strings.selectDocType}
					onChange={e => setDocType(e)}
				/>
				<FieldsRenderer
					initialValue={{
						sellertin: user.tin,
						sellername: user.name
					}}
					fields={fields}
					footer={footer}
					token={user.token}
				/>
			</ScrollView>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightBlueBackground
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-around"
	},
	inputTitle: {
		fontSize: 16,
		color: colors.grayText,
		marginVertical: 10
	},
	productsContainer: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 6,
		borderStyle: "dashed",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
		borderColor: colors.grayText,
		marginRight: 10
	},
	productsWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 15,
		marginHorizontal: 4
	},
	button: {
		paddingHorizontal: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: colors.grayText,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	flex: { flex: 1 },
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export { Add };
