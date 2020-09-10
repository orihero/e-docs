import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import requests from "../../api/requests";
import MessageCard from "../../components/cards/MessageCard";
import InnerHeader from "../../components/navigation/InnerHeader";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import {
	documentsLoaded,
	hideMessage,
	hideModal,
	showMessage,
	showModal
} from "../../redux/actions";
import { boxTypes, docStatus } from "../../redux/reducers/documents";
import _ from "lodash";
import lodash from "../../utils/lodash";

const List = ({
	navigation,
	token,
	showMessage,
	showModal,
	hideMessage,
	hideModal,
	documents: docs,
	documentsLoaded,
	loading
}) => {
	let { data, boxType, status, page, limit, filter, type } = docs;
	let [infoList, setInfoList] = useState(documents);
	let title = navigation.getParam("title");
	let reload = navigation.getParam("reload");

	let showTypes = [
		{
			label: strings.all,
			value: "all"
		},
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
	useEffect(() => {
		getDocuments();
	}, []);

	useEffect(() => {
		if (!!reload) {
			getDocuments();
			navigation.setParams({ reload: false });
		}
	}, [reload]);
	let setShowType = e => {
		documentsLoaded({ ...docs, data, boxType, status: e, page: 1, type });
		getDocuments({ status: e, boxType, type, page: 1 });
	};

	let [documents, setDocuments] = useState([]);
	let getDocuments = async (filters = {}) => {
		showModal(strings.gettingDocuments);
		let { type, filter, page: pge = page, status: innerStatus } = filters;
		try {
			let res = await requests.doc.getDocuments(
				token,
				pge,
				limit,
				boxType,
				innerStatus === "all"
					? ""
					: !!innerStatus
					? innerStatus
					: status === "all"
					? ""
					: status,
				type ? type : "",
				filter
			);
			let newRes = res.json();
			setDocuments(newRes.docs);
			hideModal();
		} catch (error) {
			hideModal();
			console.warn(error.message, "here");
			showMessage({ type: colors.killerRed, message: error.message });
		}
	};
	// useEffect(() => {
	// 	setInfoList(documents);
	// }, [documents]);

	// useEffect(() => {
	// 	getDocuments();
	// }, [boxType, status]);

	if (boxType === boxTypes.OUT) {
		showTypes[1].label = strings.sent;
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
		lodash.throttle(() => getDocuments({ filter, type }), 500);
	};

	let onEndReached = async params => {
		// console.log("ON END REACHED BEGINS", params);
		// let event = params.nativeEvent;
		// let {
		// 	contentOffset: { y },
		// 	contentSize: { height }
		// } = event;
		// let threshold = height - y;
		// console.log({ threshold, y, height });
		// await _.throttle(async () => {
		let p = Math.ceil(documents.length / limit) + 1;
		console.log("ON END REACHED", {
			page,
			p,
			res: data.length
		});
		if (page === p) return;
		let res = await requests.doc.getDocuments(
			token,
			p,
			limit,
			boxType,
			status === "all" ? "" : status,
			type,
			filter
		);
		let newRes = res.json();
		setDocuments([...documents, ...newRes.docs]);
		// }, 100);
	};

	let onSearch = (_, filter) => {
		console.log("SEARCHING");
		documentsLoaded({ ...docs, filter: filter || "", page: 1, type });
		getDocuments({ filter: filter, page: 1, type });
	};

	let onFilter = t => {
		documentsLoaded({ ...docs, type: t, page: 1 });
		getDocuments({ type: t, page: 1 });
	};

	useEffect(() => {
		console.log("Changed");
	});

	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={title}
				showTypes={showTypes}
				setShowType={setShowType}
				onSearch={onSearch}
				onFilter={onFilter}
				showType={status}
				filter={filter}
			/>
			<View style={styles.cardWrapper}>
				<FlatList
					contentContainerStyle={{
						paddingTop: 10
					}}
					showsVerticalScrollIndicator={false}
					data={documents}
					onRefresh={onRefresh}
					refreshing={loading}
					renderItem={({ item }) => (
						<MessageCard
							item={item}
							key={item.id && item.id.toString()}
							navigation={navigation}
							{...{ status, boxType }}
						/>
					)}
					keyExtractor={item => item.id && item.id.toString()}
					onEndReached={onEndReached}
					removeClippedSubviews={true}
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
