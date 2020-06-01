import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FieldsRenderer from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import RectangularSelect from "../../components/common/RectangularSelect";
import strings from "../../locales/strings";
import * as types from "../../docTypes";

const Add = () => {
	const [fields, setFields] = useState([]);
	const [docType, setDocType] = useState(0);
	let docTypes = [
		{
			label: "Доверенность",
			value: {
				doc: types.empowermentDoc,
				product: types.empowermentProduct,
				entity: types.empowermentEntity
			}
		}
	];
	useEffect(() => {
		// let temp = generateFields(docType);
		//TODO
		//  setFields(temp);
	}, [docType]);
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			<RectangularSelect
				value={docType}
				items={docTypes}
				placeholder={strings.selectDocType}
				onChange={e => setDocType(e)}
			/>
			<FieldsRenderer fields={fields} />
		</ScrollView>
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
