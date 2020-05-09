import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MessageCard from "../../components/cards/MessageCard";
import colors from "../../constants/colors";
import InnerHeader from "../../components/navigation/InnerHeader";
import strings from "../../locales/strings";
import requests from "../../api/requests";
import { connect } from "react-redux";
import {
	hideModal,
	showModal,
	hideMessage,
	showMessage
} from "../../redux/actions";

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

const List = ({
	navigation,
	token,
	showMessage,
	showModal,
	hideMessage,
	hideModal
}) => {
	let [showType, setShowType] = useState("all");
	let [infoList, setInfoList] = useState(documents);
	let title = navigation.getParam("title");

	let [documents, setDocuments] = useState([]);
	let getDocuments = async () => {
		showModal(strings.gettingDocuments);
		try {
			let res = await requests.doc.getDocuments(
				token,
				1,
				20,
				title == strings.incoming ? "in" : "out"
			);
			let newRes = res.json();
			console.warn(newRes.docs);
			setDocuments(newRes.docs);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
		}
	};
	useEffect(() => {
		setInfoList(documents);
	}, [documents]);

	useEffect(() => {
		getDocuments();
	}, []);

	useEffect(() => {
		if (showType !== "all") {
			setInfoList(
				documents.filter(item => {
					return showType === item.status;
				})
			);
		} else {
			setInfoList(documents);
		}
	}, [showType]);

	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={title}
				showTypes={[
					{
						label: strings.signed,
						value: "sended"
					},
					{
						label: strings.received,
						value: "drafts"
					},
					{
						label: strings.rejected,
						value: "deleted"
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
					data={
						infoList || {
							id: 1,
							name: 'OOO "FIDES"',
							date: "16.02.2020",
							amount: "1 450 000 сум",
							mid: "123-20/20",
							status: "signed"
						}
					}
					renderItem={({ item }) => (
						<MessageCard
							item={item}
							key={item.id && item.id.toString()}
							navigation={navigation}
						/>
					)}
					keyExtractor={item => item.id && item.id.toString()}
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

let mapStateToProps = ({ user, appState, documents }) => {
	return {
		token: user.token
	};
};
let mapDispatchToProps = {
	showMessage,
	showModal,
	hideMessage,
	hideModal
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
