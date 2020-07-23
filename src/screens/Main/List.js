import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
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
	documentsLoaded,
	loading
}) => {
	let [infoList, setInfoList] = useState(documents);
	let title = navigation.getParam("title");
	let reload = navigation.getParam("reload");
	useEffect(() => {
		if (!!reload) {
			getDocuments();
			navigation.setParams({ reload: false });
		}
	}, [reload]);
	let setShowType = async e => {
		documentsLoaded({ data, boxType, status: e, ...rest });
	};

	let [documents, setDocuments] = useState([]);
	let getDocuments = async (type, filter) => {
		showModal(strings.gettingDocuments);
		console.log({ boxType, status, type, filter });
		try {
			let res = await requests.doc.getDocuments(
				token,
				1,
				1000,
				boxType,
				status === "all" ? "" : status,
				type ? type.toLowerCase() : "",
				filter
			);
			let newRes = res.json();
			console.log({ newRes });
			setDocuments(newRes.docs);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message, "here");
			showMessage({ type: colors.killerRed, message: error.message });
		}
	};
	useEffect(() => {
		setInfoList(documents);
	}, [documents]);

	useEffect(() => {
		getDocuments();
	}, [boxType, status]);

	let showTypes = [
		{
			label: strings.received,
			value: docStatus.SENT
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
		showTypes[0].label = strings.sent;
		showTypes.push({
			label: strings.drafts,
			value: docStatus.DRAFTS
		});
		showTypes.push({
			label: strings.deleted,
			value: docStatus.DELETED
		});
	}

	let onRefresh = () => {
		getDocuments();
	};

	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={title}
				showTypes={showTypes}
				setShowType={setShowType}
				onSearch={getDocuments}
				onFilter={getDocuments}
			/>
			<View style={styles.cardWrapper}>
				<FlatList
					contentContainerStyle={{
						paddingTop: 10
					}}
					showsVerticalScrollIndicator={false}
					data={infoList}
					onRefresh={onRefresh}
					refreshing={loading}
					renderItem={({ item }) => (
						<MessageCard
							item={item}
							key={item.id && item.id.toString()}
							navigation={navigation}
							{...{ status }}
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
	documents,
	loading: appState.modalVisible
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
