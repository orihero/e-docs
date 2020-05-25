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
	showMessage,
	documentsLoaded
} from "../../redux/actions";
import { boxTypes, docStatus } from "../../redux/reducers/documents";

const List = ({
	navigation,
	token,
	showMessage,
	showModal,
	hideMessage,
	hideModal,
	documents: { data, boxType, status, ...rest },
	documentsLoaded
}) => {
	let [infoList, setInfoList] = useState(documents);
	let title = navigation.getParam("title");

	let setShowType = async e => {
		documentsLoaded({ data, boxType, status: e, ...rest });
		await getDocuments();
	};

	let [documents, setDocuments] = useState([]);
	let getDocuments = async () => {
		showModal(strings.gettingDocuments);
		try {
			let res = await requests.doc.getDocuments(
				token,
				1,
				20,
				boxType,
				status
			);
			let newRes = res.json();
			setDocuments(newRes.docs);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message);
			showMessage({ type: colors.killerRed, message: error.message });
		}
	};
	useEffect(() => {
		setInfoList(documents);
	}, [documents]);

	useEffect(() => {
		getDocuments();
	}, []);

	// useEffect(() => {
	// 	if (showType !== "all") {
	// 		setInfoList(
	// 			documents.filter(item => {
	// 				return showType === item.status;
	// 			})
	// 		);
	// 	} else {
	// 		setInfoList(documents);
	// 	}
	// }, [showType]);

	let showTypes = [
		{
			label: strings.received,
			value: docStatus.SENDED
		},
		{
			label: strings.signed,
			value: docStatus.SIGNED
		},
		{
			label: strings.rejected,
			value: docStatus.REJECTED
		}
	];

	if (boxType === boxTypes.OUT) {
		showTypes.push([
			{
				label: strings.drafts,
				value: docStatus.DRAFTS
			},
			{
				label: strings.deleted,
				value: docStatus.DELETED
			}
		]);
	}

	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={title}
				showTypes={showTypes}
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

let mapStateToProps = ({ user, appState, documents }) => ({
	token: user.token,
	documents
});
let mapDispatchToProps = {
	showMessage,
	showModal,
	hideMessage,
	hideModal,
	documentsLoaded
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
