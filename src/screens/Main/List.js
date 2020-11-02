import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { prodUrl, url } from "../../api/configs";
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

const List = ({
	navigation,
	token,
	showMessage,
	showModal,
	hideMessage,
	hideModal,
	documents: docs,
	documentsLoaded,
	loading,
	settings
}) => {
	// let { data, boxType, status, page, limit, filter, type } = docs;
	let { boxType } = docs;
	let title = navigation.getParam("title");
	let reload = navigation.getParam("reload");
	let defaultFilter = {
		type: "",
		status: "",
		page: "",
		filter: ""
	};
	const [filters, setFilters] = useState(defaultFilter);
	const [refreshing, setRefreshing] = useState({
		loading: false,
		nextPage: 2
	});
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
	}, [filters]);

	useEffect(() => {
		if (!!reload) {
			getDocuments();
			navigation.setParams({ reload: false });
		}
	}, [reload]);
	let setShowType = e => {
		setFilters({ ...filters, status: e, page: 1 });
	};
	let [documents, setDocuments] = useState([]);
	let getDocuments = async () => {
		showModal(strings.gettingDocuments);
		let { type, filter, page: pge = page, status: innerStatus } = filters;
		try {
			let res = await requests.doc.getDocuments(
				token,
				pge,
				20,
				boxType,
				innerStatus,
				type ? type : "",
				filter,
				settings.url.value ? url : prodUrl
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
		getDocuments();
	};

	let onEndReached = async params => {
		let { status, page, type, filter } = filters;
		console.log({ page, refreshing });
		if (refreshing.loading || refreshing.nextPage <= page) return;
		setRefreshing({ ...refreshing, loading: true });
		let res;
		try {
			res = await requests.doc.getDocuments(
				token,
				refreshing.nextPage,
				20,
				boxType,
				status === "all" ? "" : status,
				type,
				filter,
				settings.url.value ? url : prodUrl
			);
		} catch (error) {
			console.warn(error);
			setRefreshing({ nextPage: 2, loading: false });
		}
		let newRes = res.json();
		console.log({ newRes });
		setDocuments([...documents, ...newRes.docs]);
		setRefreshing({ loading: false, nextPage: newRes.nextPage });
	};

	let onSearch = (_, filter) => {
		console.log("SEARCHING");
		setFilters({ ...filters, filter, page: 1 });
		// getDocuments();
	};

	let onFilter = t => {
		setFilters({ ...filters, type: t, page: 1 });
		// getDocuments();
	};

	return (
		<View style={styles.container}>
			<InnerHeader
				navigation={navigation}
				currentPage={title}
				showTypes={showTypes}
				setShowType={setShowType}
				onSearch={onSearch}
				onFilter={onFilter}
				showType={filters.status}
				filter={filters.filter}
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
							key={item.id}
							navigation={navigation}
							{...{ status: filters.status, boxType }}
						/>
					)}
					keyExtractor={item => item.id}
					onEndReached={onEndReached}
					// Performance settings
					removeClippedSubviews={false} // Unmount components when outside of window
					// initialNumToRender={2} // Reduce initial render amount
					// maxToRenderPerBatch={1} // Reduce number in each render batch
					// updateCellsBatchingPeriod={100} // Increase time between renders
					// windowSize={7} // Reduce the window size
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
	loading: appState.modalVisible,
	settings: appState.settings
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
