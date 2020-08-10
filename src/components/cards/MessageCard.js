import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";
import Moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { docStatus, boxTypes } from "../../redux/reducers/documents";
import { normalizePrice } from "../../utils/object";

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

const MessageCard = ({ item, navigation, status, boxType }) => {
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

	let name =
		boxType === boxTypes.IN
			? item.ownerName
			: `${item.targetTins[0]?.name} ${
					item.targetTins.length > 1
						? `(+${item.targetTins.length - 1})`
						: ""
			  }`;

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
						<View style={{ flex: 1 }}>
							<Text style={styles.name} numberOfLines={2}>
								{name}
							</Text>
						</View>
						{!!item.docDate && (
							<Text style={styles.date}>
								{!!item.docNumber && `№ ${item.docNumber}`}
								{item.docDate
									? ` ― ${Moment(item.docDate).format(
											"DD.MM.YYYY"
									  )}`
									: ""}
								{/* {Moment(item.docDate).format("DD.MM.YYYY")} */}
							</Text>
						)}
					</View>
					<View style={styles.textWrapper}>
						<Text style={[styles.text]}>
							{strings.amount}:{" "}
							{normalizePrice(
								item.totalSum ? item.totalSum.toString() : ""
							)}
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
		marginHorizontal: 20,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
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
		fontWeight: "bold",
		flexWrap: "wrap"
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
