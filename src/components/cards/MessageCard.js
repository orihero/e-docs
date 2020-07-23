import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";
import Moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { docStatus } from "../../redux/reducers/documents";

export let docTypes = {
	FACTURA: "Счет-фактура",
	EMPOWERMENT: "Доверенность",
	UNIVERSAL: "Универсальный документ",
	ACTWORKPERFORMED: "Акт выполненных работ",
	ACTGOODSACCEPTANCE: "Акт приема-передачи",
	WAYBILL: "Товарно транспортная накладная",
	INVOICE: "Счет на оплату",
	CUSTOMERORDER: "Заказ"
};

const MessageCard = ({ item, navigation, status }) => {
	let [backgroundColor, setBackgroundColor] = useState("transparent");
	useEffect(() => {
		switch (item.status) {
			case docStatus.SIGNED:
				setBackgroundColor(colors.green);
				break;
			case docStatus.SENT:
				setBackgroundColor(colors.gold);
				break;
			case docStatus.REJECTED:
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
						backgroundColor
					}
				]}
			>
				<View style={styles.content}>
					<Text style={styles.title}>
						{docTypes[item.type.toUpperCase()] || ""}
					</Text>
					<View style={styles.textWrapper}>
						<Text style={styles.name}>{item.ownerName}</Text>
						{!!item.docDate && (
							<Text style={styles.date}>
								{Moment(item.docDate).format("DD.MM.YYYY")}
							</Text>
						)}
					</View>
					<View style={styles.textWrapper}>
						<Text style={[styles.text]}>
							{strings.amount}: {item.totalSum}
						</Text>
						<Text style={styles.text}>
							{!!item.contractNumber &&
								`№ ${item.contractNumber}`}
							{item.contractDate
								? ` ― ${Moment(item.contractDate).format(
										"DD.MM.YYYY"
								  )}`
								: ""}
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
	text: { color: colors.darkGrayBorder, flexShrink: 1, flexWrap: "wrap" },
	title: {
		fontSize: 16,
		fontWeight: "bold"
	}
});

export default MessageCard;
