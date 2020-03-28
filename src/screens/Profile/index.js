import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MessageCard from "../../components/cards/MessageCard";
import colors from "../../constants/colors";
import InnerHeader from "../../components/navigation/InnerHeader";
import strings from "../../locales/strings";

const messageList = [
	{
		id: 1,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "signed"
	},
	{
		id: 2,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "rejected"
	},
	{
		id: 3,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "received"
	},
	{
		id: 4,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "signed"
	},
	{
		id: 5,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "rejected"
	},
	{
		id: 6,
		name: 'OOO "FIDES"',
		date: "16.02.2020",
		amount: "1 450 000 сум",
		mid: "123-20/20",
		status: "received"
	}
];

const Profile = ({}) => {
	let [showType, setShowType] = useState("all");
	let [infoList, setInfoList] = useState(messageList);

	useEffect(() => {
		if (showType !== "all") {
			setInfoList(
				messageList.filter(item => {
					return showType === item.status;
				})
			);
		} else {
			setInfoList(messageList);
		}
	}, [showType]);

	return (
		<View style={styles.container}>
			<InnerHeader
				currentPage={strings.incoming}
				showTypes={[
					{
						label: strings.signed,
						value: "signed"
					},
					{
						label: strings.received,
						value: "received"
					},
					{
						label: strings.rejected,
						value: "rejected"
					}
				]}
				setShowType={setShowType}
			/>
			<View style={styles.cardWrapper}>
				<FlatList
					contentContainerStyle={{
						paddingTop: 10
					}}
					showsVerticalScrollIndicator={false}
					data={infoList}
					renderItem={({ item }) => (
						<MessageCard item={item} key={item.id.toString()} />
					)}
					keyExtractor={item => item.id.toString()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	cardWrapper: {
		flex: 1
	}
});

export default Profile;
