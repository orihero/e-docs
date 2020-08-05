import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FieldsRenderer, {
	FieldType,
	FieldSize
} from "../../components/generators/FieldsRenderer";
import strings from "../../locales/strings";
import colors from "../../constants/colors";
import RectangleButton from "../../components/common/RectangleButton";
import { withNavigation } from "react-navigation";

let fields = [
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.name,
		title: strings.name,
		name: "name",
		disabled: true
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.description,
		title: strings.description,
		name: "description",
		disabled: true
	},
	{
		type: FieldType.CHECKBOX,
		size: FieldSize.FULL,
		placeholder: strings.name,
		title: strings.withoutVat,
		name: "withoutVat",
		disabled: true
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.articul,
		title: strings.articul,
		name: "code",
		disabled: true
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.pack,
		title: strings.pack,
		name: "pack",
		disabled: true
	}
];

const SingleProducts = ({ item, navigation }) => {
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<FieldsRenderer fields={fields} initialValue={{ ...item }} />
				{!!item.prices &&
					item.prices.map(e => {
						return (
							<FieldsRenderer
								key={e.id}
								fields={[
									{
										type: FieldType.LINE,
										size: FieldSize.FULL,
										columns: [
											{
												type: FieldType.INPUT,
												size: FieldSize.HALF,
												placeholder: strings.number,
												name: "count",
												title: strings.min
											},
											{
												type: FieldType.INPUT,
												placeholder: strings.selectDate,
												size: FieldSize.HALF,
												name: "price",
												title: strings.price
											}
										]
									}
								]}
								initialValue={{ ...e }}
							/>
						);
					})}
				<RectangleButton
					onPress={() => navigation.goBack()}
					text={strings.back}
					backColor={colors.killerRed}
					style={{
						startColor: "red",
						endColor: colors.killerRed,
						marginVertical: 10
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default withNavigation(SingleProducts);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 15
	}
});
