import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";
import Moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const MessageCard = ({ item, navigation }) => {
	// const example = {
	// 	_id: "5ea0362fb0b10417d8096549",
	// 	baseDocs: [],
	// 	contractDate: "2020-04-22T00:00:00.000Z",
	// 	contractNumber: "123",
	// 	createdAt: "2020-04-22T12:18:55.185Z",
	// 	docDate: "2020-04-22T00:00:00.000Z",
	// 	docNumber: "test1",
	// 	local: true,
	// 	notes: "",
	// 	ownerName: '"FIDES PROJECTS" XK',
	// 	ownerTin: "302204416",
	// 	roumingId: "5ea036ff9dc17300019603a3",
	// 	sentDate: "2020-04-22T12:19:26.825Z",
	// 	stateId: 15,
	// 	status: "sended",
	// 	subType: "factura",
	// 	targetTins: [
	// 		{
	// 			name: 'ООО "UCARD  ELEMENT"',
	// 			side: "buyer",
	// 			signed: 0,
	// 			tin: "306589734"
	// 		}
	// 	],
	// 	totalDocSum: 2829,
	// 	totalFuelSum: 0,
	// 	totalSum: 2829,
	// 	totalSumWithVat: 2829,
	// 	totalVatSum: 0,
	// 	type: "factura",
	// 	updatedAt: "2020-04-22T12:19:26.827Z"
	// };

	let [backgroundColor, setBackgroundColor] = useState("transparent");
	console.warn(item);
	useEffect(() => {
		switch (item.status) {
			case "sended":
				setBackgroundColor(colors.green);
				break;
			case "drafts":
				setBackgroundColor(colors.gold);
				break;
			case "deleted":
				setBackgroundColor(colors.darkPink);
				break;
			default:
				setBackgroundColor(colors.white);
		}
	}, [item]);

	const onPress = () => {
		navigation.navigate("PdfView", {
			document: item
		});
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: backgroundColor
					}
				]}
			>
				<View style={styles.content}>
					<View style={styles.textWrapper}>
						<Text style={styles.name}>{item.ownerName}</Text>
						<Text style={styles.date}>
							{Moment(item.docDate).format("d.mm.yyyy")}
						</Text>
					</View>
					<View style={styles.textWrapper}>
						<Text style={[styles.text]}>
							{strings.amount}: {item.totalSum}
						</Text>
						<Text style={styles.text}>
							{item.contractNumber}/
							{Moment(item.contractDate).format("d.mm.yyyy")}}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingLeft: 3,
		borderRadius: 5,
		marginBottom: 10,
		elevation: 3,
		marginHorizontal: 20
	},
	content: {
		backgroundColor: colors.white,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 10,
		borderTopLeftRadius: 2,
		borderBottomLeftRadius: 2,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	textWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10
	},
	name: {
		color: colors.darkViolet,
		fontSize: 14,
		fontWeight: "bold"
	},
	date: {
		color: colors.grayText
		// fontWeight: 'bold',
	},
	text: { color: colors.darkGrayBorder }
});

export default MessageCard;
