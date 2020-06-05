import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	TouchableWithoutFeedback
} from "react-native";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import RectangularSelect from "../../components/common/RectangularSelect";
import strings from "../../locales/strings";
import * as types from "../../docTypes";
import {
	actGoodsAcceptanceFields,
	actWorkPerformedFields,
	actWorkPerformedProduct
} from "../../docTypes";
import AntDesign from "react-native-vector-icons/AntDesign";
import Products from "./Products";
import Text from "../../components/common/Text";

const Add = ({ navigation }) => {
	const [fields, setFields] = useState([]);
	const [docType, setDocType] = useState(-1);
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
				product: types.empowermentProduct,
				entity: types.empowermentEntity
			}
		},
		{
			label: "Акт выполненных работ",
			value: {
				fields: actWorkPerformedFields,
				productModel: actWorkPerformedProduct
			}
		},
		{
			label: "Акт приема-передачи",
			value: {
				fields: actGoodsAcceptanceFields,
				productModel: types.actGoodsAcceptanceProduct
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
				product: types.actWorkPerformedDocProduct,
				entity: types.actWorkPerformedDocEntity
			}
		},
		{
			label: "Универсальный документ ",
			value: 6,
			actualValue: {
				doc: types.actWorkPerformedDoc,
				product: types.actWorkPerformedDocProduct,
				entity: types.actWorkPerformedDocEntity
			}
		}
	];
	let footer = () => {
		return (
			<View>
				{!!docType && !!docType.productModel && (
					<View style={styles.productsWrapper}>
						<View style={styles.productsContainer}>
							<Text style={styles.inputTitle}>
								{strings.products}
							</Text>
							<Text style={styles.inputTitle}>{0}</Text>
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
				<FieldsRenderer fields={fields} footer={footer} />
			</ScrollView>
		</View>
	);
};

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
		marginHorizontal: 20
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
	flex: { flex: 1 }
});

export { Add };
