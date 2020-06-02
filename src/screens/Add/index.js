import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import RectangularSelect from "../../components/common/RectangularSelect";
import strings from "../../locales/strings";
import * as types from "../../docTypes";
import { actGoodsAcceptanceFields } from "../../docTypes";

const Add = () => {
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
			value: { fields: actGoodsAcceptanceFields }
		},
		{
			label: "Акт приема-передачи",
			value: 3,
			actualValue: {
				doc: types.actGoodsAcceptanceDoc,
				product: types.actGoodsAcceptanceProduct
			}
		},
		{
			label: "Товарно транспортная накладная",
			value: 4,
			actualValue: {
				doc: types.actWorkPerformedDoc,
				product: types.actWorkPerformedDocProduct,
				entity: types.actWorkPerformedDocEntity
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
	useEffect(() => {
		// let temp = types.generateFields(docType);
		//TODO
		//  setFields(temp);
	}, [docType]);
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
				<FieldsRenderer fields={fields} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightBlueBackground
	}
});

export { Add };
