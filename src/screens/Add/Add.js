import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import requests from "../../api/requests";
import RectangleButton from "../../components/common/RectangleButton";
import RectangularSelect from "../../components/common/RectangularSelect";
import Text from "../../components/common/Text";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import { convertToTypeOf } from "../../utils/object";
import {
	empowermentDoc,
	empowermentFields,
	empowermentProduct
} from "../../docTypes/empowerment";

import {
	actWorkPerformedDoc,
	actWorkPerformedFields,
	actWorkPerformedProduct
} from "../../docTypes/actWorkPerformed";

import {
	actGoodsAcceptanceDoc,
	actGoodsAcceptanceFields,
	actGoodsAcceptanceProduct
} from "../../docTypes/actGoodsAcceptance";

import {
	waybillDoc,
	waybillFields,
	waybillProduct
} from "../../docTypes/waybill";

import { universalDoc, universalFields } from "../../docTypes/universal";

import {
	customerOrderDoc,
	customerOrderFields,
	customerOrderProduct
} from "../../docTypes/customerOrder";

import {
	facturaDoc,
	facturaFields,
	facturaProduct
} from "../../docTypes/factura";

import {
	showModal,
	hideModal,
	showMessage,
	hideMessage
} from "../../redux/actions";

const mapStateToProps = ({ user }) => ({ user });

const Add = connect(
	mapStateToProps,
	{ showModal, hideModal, showMessage, hideMessage }
)(({ navigation, user, showModal, hideModal, showMessage, hideMessage }) => {
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
			label: "Счет-фактура",
			value: {
				fields: facturaFields,
				productModel: facturaProduct,
				doc: facturaDoc,
				docType: "empowerment"
			}
		},
		{
			label: "Доверенность",
			value: {
				fields: empowermentFields,
				productModel: empowermentProduct,
				doc: empowermentDoc,
				docType: "empowerment"
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
				productModel: actGoodsAcceptanceProduct,
				doc: actGoodsAcceptanceDoc,
				docType: "actGoodsAcceptance"
			}
		},
		{
			label: "Товарно транспортная накладная",
			value: {
				fields: waybillFields,
				productModel: waybillProduct,
				doc: waybillDoc,
				docType: "waybill"
			}
		},
		{
			label: "Заказ",
			value: {
				fields: customerOrderFields,
				productModel: customerOrderProduct,
				doc: customerOrderDoc,
				docType: "customerOrder"
			}
		},
		{
			label: "Универсальный документ ",
			value: {
				fields: universalFields,
				doc: universalDoc,
				docType: "universal"
			}
		}
	];

	/**
	 ** Creation of document
	 * @param {any} data Gathered after the completion of form
	 */
	let onCreate = async data => {
		//TODO start loading
		showModal();
		//* Model for the product
		let productModel = docType.productModel;
		//* Model for the document
		let doc = docType.doc;
		let parsedProducts = [];
		let temp = { ...data };
		//? Universal document has no product
		if (docType.docType !== "universal") {
			//? Validation
			//* Since React-native input generate only string we have to parse all the string to corresponding data type
			parsedProducts = productList.products.map(product => {
				let parsedProduct = Object.keys(product).reduce((prev, key) => {
					return {
						...prev,
						[key]: convertToTypeOf(productModel[key], product[key])
					};
				}, {});
				return parsedProduct;
			});
		} else {
			//* Document is universal
			let { base64: filebase64, type: filetype, name: filename } =
				data.file || {};
			temp = {
				...temp,
				file: { filebase64, filename, filetype }
			};
			let dataProductList = temp.productList || {};
			let docProductList = docType.doc.productlist || {};
			console.log({ dataProductList, docProductList });

			let parsedProduct = Object.keys(dataProductList).reduce(
				(prev, key) => {
					return {
						...prev,
						[key]: convertToTypeOf(
							docProductList[key],
							dataProductList[key]
						)
					};
				},
				{}
			);
			productList = { ...docProductList, ...parsedProduct };
		}
		//* Temporary submit data
		temp = {
			...temp,
			productlist: { ...productList, products: parsedProducts }
		};
		console.log({ parsedProducts });
		//* Make sure that submit data is similar to document model
		let submitData = Object.keys(doc).reduce((prev, key) => {
			return { ...prev, [key]: temp[key] };
		}, {});

		try {
			//TODO Empoverment fill agent passport manually
			if (docType.docType === "empowerment") {
				let { passport } = data || {};
				submitData.agent = {
					...submitData.agent,
					passport
				};
			}
			console.log("SENDING FILE:", { file: data.file });

			console.log("SENDING REQUEST TO CREATE", { submitData });
			let res = await requests.doc.create(
				user.token,
				docType.docType,
				submitData
			);
			console.warn({ response: res.json() });
			console.warn({ response: res.json().toString() });
			showMessage({
				type: colors.green,
				message: strings.createdSuccessfully
			});
		} catch (error) {
			//TODO show error message
			console.warn(error);
			showMessage({ type: colors.killerRed, message: error.message });
		}
		console.log("SEND COMPLETE");
		//TODO stop loading
		//TODO show success message
		// let sign = await signProvider.sign(JSON.stringify(submitData));
		hideModal();
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
				{!!user.tin && (
					<FieldsRenderer
						initialValue={{
							ownertin: user.tin,
							ownername: user.name,
							sellertin: user.tin,
							sellername: user.name,
							seller: user
						}}
						fields={fields}
						footer={footer}
						token={user.token}
					/>
				)}
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

export default Add;
