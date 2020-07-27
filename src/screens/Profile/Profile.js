import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import MessageCard from "../../components/cards/MessageCard";
import colors from "../../constants/colors";
import InnerHeader from "../../components/navigation/InnerHeader";
import strings from "../../locales/strings";
import FieldsRenderer, {
	FieldType,
	FieldSize
} from "../../components/generators/FieldsRenderer";
import { connect } from "react-redux";
import requests from "../../api/requests";
import RectangleButton from "../../components/common/RectangleButton";
import { userLoggedOut } from "../../redux/actions";

const messageList = [
	// {
	// 	id: 1,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "signed"
	// },
	// {
	// 	id: 2,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "rejected"
	// },
	// {
	// 	id: 3,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "received"
	// },
	// {
	// 	id: 4,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "signed"
	// },
	// {
	// 	id: 5,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "rejected"
	// },
	// {
	// 	id: 6,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "received"
	// }
];

let fields = [
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		disabled: true,
		name: "tin"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		disabled: true,
		name: "name"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.phone,
		size: FieldSize.FULL,
		disabled: true,
		name: "phone"
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.bank,
		size: FieldSize.FULL,
		disabled: true,
		name: "bankId",
		fetch: requests.account.getBanks,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.bankId
		})
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.account,
		size: FieldSize.FULL,
		disabled: true,
		name: "account"
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.region,
		size: FieldSize.FULL,
		name: "regionId",
		fetch: requests.account.getRegions,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.regionId
		})
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.district,
		size: FieldSize.FULL,
		disabled: true,
		name: "districtId",
		fetch: requests.account.getDistricts,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.districtId
		})
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.address,
		size: FieldSize.FULL,
		disabled: true,
		name: "address"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.oked,
		size: FieldSize.FULL,
		disabled: true,
		name: "oked"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.director,
		size: FieldSize.FULL,
		disabled: true,
		name: "director"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.accountant,
		size: FieldSize.FULL,
		disabled: true,
		name: "accountant"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.itemReleased,
		size: FieldSize.FULL,
		disabled: true,
		name: "itemReleased"
	},
	{
		type: FieldType.CHECKBOX,
		placeholder: strings.vat,
		size: FieldSize.FULL,
		disabled: true,
		title: strings.vat,
		name: "vat"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.vatRegCode,
		size: FieldSize.FULL,
		disabled: true,
		name: "vatRegCode"
	}
];

const Profile = ({ user, dispatch, navigation }) => {
	let logout = () => {
		dispatch(userLoggedOut());
		navigation.navigate("Login");
	};
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{!!user.tin && (
					<FieldsRenderer fields={fields} initialValue={user} />
				)}
				<RectangleButton
					backColor={colors.jeansBlue}
					text={strings.logout}
					onPress={logout}
					style={{
						marginTop: 20,
						marginHorizontal: 20
					}}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 10
	},
	cardWrapper: {
		flex: 1
	}
});

export default connect(({ user }) => ({ user }))(Profile);
