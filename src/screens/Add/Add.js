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
import FieldsRenderer, {
	FieldSize,
	FieldType
} from "../../components/generators/FieldsRenderer";
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
import { SafeAreaView } from "react-native-safe-area-context";
import CustomPicker from "../../components/common/CustomPicker";
import RectangularInput from "../../components/common/RectangularInput";
import RectangularDatePicker from "../../components/common/RectangularDatePicker";
import { prodUrl, url } from "../../api/configs";

const mapStateToProps = ({ user, appState: { settings } }) => ({
	user,
	settings
});

export let docTypes = [
	{
		label: "Счет-фактура",
		data: {
			fields: facturaFields,
			productModel: facturaProduct,
			doc: facturaDoc,
			docType: "factura"
		},
		value: 0
	},
	{
		label: "Доверенность",
		data: {
			fields: empowermentFields,
			productModel: empowermentProduct,
			doc: empowermentDoc,
			docType: "empowerment",
			reverse: true
		},
		value: 1
	},
	{
		label: "Акт выполненных работ",
		data: {
			fields: actWorkPerformedFields,
			productModel: actWorkPerformedProduct,
			doc: actWorkPerformedDoc,
			docType: "actWorkPerformed"
		},
		value: 2
	},
	{
		label: "Акт приема-передачи",
		data: {
			fields: actGoodsAcceptanceFields,
			productModel: actGoodsAcceptanceProduct,
			doc: actGoodsAcceptanceDoc,
			docType: "actGoodsAcceptance"
		},
		value: 3
	},
	{
		label: "Товарно транспортная накладная",
		data: {
			fields: waybillFields,
			productModel: waybillProduct,
			doc: waybillDoc,
			docType: "waybill"
		},
		value: 4
	},
	{
		label: "Заказ",
		data: {
			fields: customerOrderFields,
			productModel: customerOrderProduct,
			doc: customerOrderDoc,
			docType: "customerOrder",
			reverse: true
		},
		value: 5
	},
	{
		label: "Универсальный документ ",
		data: {
			fields: universalFields,
			doc: universalDoc,
			docType: "universal"
		},
		value: 6
	}
];

let facturaTypes = [
	{ value: 0, label: strings.standart },
	{ label: strings.additional, value: 1 },
	{ label: strings.expenditure, value: 2 },
	{ label: strings.noPayment, value: 3 },
	{ label: strings.corrected, value: 4 }
];

let directions = [
	{ value: 0, label: strings.toLLC },
	{ label: strings.toPhysical, value: 1 },
	{ label: strings.toExport, value: 2 },
	{ label: strings.toImport, value: 3 },
	{ label: strings.realization, value: 4 },
	{ label: strings.financialServices, value: 5 }
];

let facturaVisibleFields = {
	0: { edit: false, user: true },
	1: { edit: true, user: false },
	2: { edit: false, user: false },
	3: { edit: false, user: true },
	4: { edit: true, user: false },
	5: { edit: false, user: false }
};

const Add = connect(
	mapStateToProps,
	{ showModal, hideModal, showMessage, hideMessage }
)(
	({
		navigation,
		user,
		showModal,
		hideModal,
		showMessage,
		hideMessage,
		settings
	}) => {
		const [fields, setFields] = useState([]);
		const [docType, setDocType] = useState(-1);
		const [facturaType, setFacturaType] = useState(-1);
		const [direction, setDirection] = useState(-1);
		const [state, setState] = useState({});
		console.log({ settings });
		let productList = navigation.getParam("productList") || {
			products: []
		};
		let document = navigation.getParam("document") || {};
		let currentDocType = docType == -1 ? {} : docTypes[docType].data;
		let onDocChange = () => {
			if (currentDocType.fields) {
				console.log({
					direction,
					l: facturaVisibleFields[direction]?.user,
					val:
						docType === 0 &&
						direction !== -1 &&
						facturaVisibleFields[direction]?.user
				});
				if (
					docType === 0 &&
					direction !== -1 &&
					facturaVisibleFields[direction]?.user
				) {
					console.log("Changing doc type");
					setFields([
						...currentDocType.fields,
						{
							type: FieldType.AUTOCOMPLETE,
							placeholder: strings.inn,
							size: FieldSize.FULL,
							name: "buyertin",
							title: strings.buyer,
							componentProps: {
								maxLength: 9,
								keyboardType: "number-pad"
							},
							fetch: requests.account.getProfileByTin
						}
					]);
					return;
				}
				setFields(currentDocType.fields);
			} else {
				setFields([]);
			}
		};
		useEffect(() => {
			onDocChange();
		}, [docType]);

		useEffect(() => {
			onDocChange();
		}, [direction]);

		// useEffect(() => {
		// 	console.log("THE DOCUMENT LOADED");
		// 	let doc = docTypes.find(e => e.value.docType === document.type) || {};
		// 	setDocType(doc);
		// }, [document]);

		/**
		 ** Creation of document
		 * @param {any} data Gathered after the completion of form
		 */
		let onCreate = async (data, resetData) => {
			//TODO start loading
			showModal();
			//* Model for the product
			let productModel = currentDocType.productModel;
			//* Model for the document
			let doc = currentDocType.doc;
			let parsedProducts = [];
			let temp = { ...data };
			let submitData = {};
			//? Universal document has no product
			try {
				if (currentDocType.docType !== "universal") {
					//? Validation
					//* Since React-native input generate only string we have to parse all the string to corresponding data type
					parsedProducts =
						productList.products.map(product => {
							let parsedProduct = Object.keys(product).reduce(
								(prev, key) => {
									return {
										...prev,
										[key]: convertToTypeOf(
											productModel[key],
											product[key]
										)
									};
								},
								{}
							);
							return parsedProduct;
						}) || doc.productlist;
				} else {
					//* Document is universal
					let { base64: filebase64, type: filetype, name: filename } =
						data.file || {};
					temp = {
						...temp,
						file: { filebase64, filename, filetype }
					};
					let dataProductList = temp.productList || {};
					let docProductList = currentDocType.doc.productlist || {};
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
					productList = {
						...docProductList,
						...parsedProduct
					};
				}
				console.log(
					`\n\n\n*********************\n*************`,
					{ settings },
					`******************\n***********\n\n`
				);
				let productCredentials = Object.keys(
					currentDocType.doc.productlist
				).reduce((prev, current) => {
					return { ...prev, [current]: settings[current]?.value };
				}, {});
				//* Temporary submit data
				temp = {
					...temp,
					productlist: {
						...productList,
						...productCredentials,
						products: parsedProducts
					}
				};
				console.log(
					`\n\n\n*********************\n*************`,
					{ temp },
					`******************\n***********\n\n`
				);
				//* Make sure that submit data is similar to document model
				submitData = Object.keys(doc).reduce((prev, key) => {
					console.log({ docKey: doc[key] });
					return { ...prev, [key]: temp[key] || doc[key] };
				}, {});
				submitData.seller.mobile = submitData.seller.mobile || "";
				submitData.seller.workphone = submitData.seller.mobile || "";
				submitData.buyer.mobile = submitData.buyer.mobile || "";
				submitData.buyer.workphone = submitData.buyer.workphone || "";
				if (docType === 0) {
					submitData = {
						...submitData,
						...state,
						facturatype: facturaType,
						singlesidedtype: direction
					};
				}
				console.log("DSA", submitData);
			} catch (error) {
				//* Error in formulating submit data!
				hideModal();
				showMessage({
					type: colors.killerRed,
					message: strings.fillAllFields
				});
				console.warn(error);
			}

			try {
				//TODO Empoverment fill agent passport manually
				if (currentDocType.docType === "empowerment") {
					let { passport } = data || {};
					submitData.agent = {
						...submitData.agent,
						passport
					};
					submitData.acttext = strings.formatString(
						strings.actText,
						data.sellername,
						data.buyer?.name
					);
				}
				if (currentDocType.reverse) {
					let tObj = submitData.buyername;
					let tTin = submitData.buyertin;
					let t = submitData.buyer;
					submitData.buyertin = submitData.sellertin;
					submitData.buyername = submitData.sellername;
					submitData.sellertin = tTin;
					submitData.sellername = tObj;
				}
				console.log("SENDING FILE:", { file: data.file });

				console.log("SENDING REQUEST TO CREATE", { submitData });
				let res = await requests.doc.create(
					user.token,
					currentDocType.docType,
					submitData,
					settings.url.value ? url : prodUrl
				);
				console.warn({ json: res.json(), submitData });
				let r = res.json();
				if (r.success === false) {
					hideModal();
					let { errors } = r || {};
					let errorMsg = errors.msg.reduce((prev, current) => {
						return (
							prev +
							`${strings[current.msg] || current.msg} ${
								current.param
							}  `
						);
					}, "");
					return showMessage({
						type: colors.killerRed,
						message: errorMsg
					});
				}
				showMessage({
					type: colors.green,
					message: strings.createdSuccessfully
				});
				setDocType(-1);
				resetData && resetData();
				navigation.navigate("Main");
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

		let footer = ({ getSubmitData, resetData }) => {
			return (
				<View>
					{docType !== -1 && !!currentDocType.productModel && (
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
										model: currentDocType.productModel || {}
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
					{!!currentDocType.fields && (
						<RectangleButton
							backColor={colors.white}
							text={strings.create}
							onPress={() => onCreate(getSubmitData(), resetData)}
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
					<SafeAreaView>
						<RectangularSelect
							value={docType}
							items={docTypes}
							placeholder={strings.selectDocType}
							onChange={e => {
								setDocType(e);
							}}
						/>
						{docType === 0 && (
							<View style={{ paddingVertical: 20 }}>
								<RectangularSelect
									value={facturaType}
									items={facturaTypes}
									placeholder={strings.facturaType}
									onChange={e => {
										setFacturaType(e);
									}}
								/>
							</View>
						)}
						{docType === 0 && (
							<View style={{ paddingBottom: 20 }}>
								<RectangularSelect
									value={direction}
									items={directions}
									placeholder={strings.direction}
									onChange={e => {
										setDirection(e);
									}}
								/>
							</View>
						)}
						{!!facturaVisibleFields[facturaType] &&
							facturaVisibleFields[facturaType].edit && (
								<View>
									<RectangularInput
										value={state.facturaid}
										placeholder={strings.identifier}
										onChange={facturaid =>
											setState({ ...state, facturaid })
										}
									/>
									<RectangularInput
										value={state.facturano}
										placeholder={strings.number}
										onChange={facturano =>
											setState({ ...state, facturano })
										}
									/>
									<RectangularDatePicker
										value={state.facturadate}
										placeholder={strings.selectDate}
										onChange={facturadate =>
											setState({ ...state, facturadate })
										}
										containerStyle={{
											marginHorizontal: 18
										}}
									/>
								</View>
							)}
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
					</SafeAreaView>
				</ScrollView>
			</View>
		);
	}
);

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
