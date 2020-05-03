import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/common/Text";
import FieldsRenderer, {
	FieldType,
	FieldSize
} from "../../components/generators/FieldsRenderer";
import strings from "../../locales/strings";
import colors from "../../constants/colors";

const Add = () => {
	let fields = [
		{
			type: FieldType.SELECT,
			placeholder: strings.invoiceType,
			size: FieldSize.FULL,
			name: "invoiceType",
			staticValue: [
				{ value: 5, label: "Contract", actualValue: 5 },
				{ value: 1, label: "Act-performed", actualValue: 1 },
				{ value: 2, label: "Empowerment", actualValue: 2 },
				{ value: 3, label: "Invoice", actualValue: 3 }
			]
			// fetch: () => requests.documents.getDocumentTypes(2),
			// map: (e, index) => ({
			// 	value: index,
			// 	label: e.docTypeName,
			// 	actualValue: e.docTypeCode
			// })
		},
		{
			type: FieldType.SELECT,
			placeholder: strings.recieverInn,
			size: FieldSize.FULL,
			name: "buyerTin"
			// fetch: requests.user.getRequisite
		},
		{
			type: FieldType.LINE,
			size: FieldSize.FULL,
			columns: [
				{
					type: FieldType.INPUT,
					size: FieldSize.HALF,
					placeholder: strings.documentNumber,
					name: "document.documentNumber"
				},
				{
					type: FieldType.DATE_PICKER,
					placeholder: strings.selectDate,
					size: FieldSize.HALF,
					name: "document.documentDate"
				}
			]
		},
		{
			type: FieldType.LINE,
			size: FieldSize.FULL,
			columns: [
				{
					type: FieldType.INPUT,
					// title: strings.amount,
					size: FieldSize.QUERTER_THREE,
					placeholder: strings.enterAmount,
					name: "sum"
				},
				{
					type: FieldType.SELECT,
					placeholder: strings.uzs,
					size: FieldSize.QUARTER,
					// title: strings.currency,
					name: "currencyId",
					staticValue: [
						{ label: "UZS", actualValue: 1, value: 0 },
						{ label: "USD", actualValue: 2, value: 1 },
						{ label: "RUB", actualValue: 3, value: 2 },
						{ label: "EUR", actualValue: 4, value: 3 }
					]
				}
			]
		},
		{
			type: FieldType.INPUT,
			// title: strings.comments,
			placeholder: strings.enterComments,
			size: FieldSize.FULL,
			name: "description"
		},
		{
			type: FieldType.FILE,
			placeholder: strings.selectFile,
			size: FieldSize.FULL,
			name: "file",
			title: strings.reset
		}
	];
	return (
		<View style={styles.container}>
			<FieldsRenderer fields={fields} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: colors.lightBlueBackground
	}
});

export { Add };
