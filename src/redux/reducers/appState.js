import strings from "../../locales/strings";
import {
	HIDE_HEAD_UP,
	HIDE_MODAL,
	HIDE_NOTIFICATION,
	SET_SETTINGS,
	SET_SETTING_VALUE,
	SHOW_HEAD_UP,
	SHOW_MODAL,
	SHOW_NOTIFICATION
} from "../types";

const initialState = {
	modalVisible: false,
	message: "",
	headUpMessage: null,
	headUpType: "",
	headUpKey: 0,
	notification: false,
	notificationData: {},
	settings: {
		hasvat: { value: false, text: strings.hasvat },
		hasexcise: { value: false, text: strings.hasexcise },
		hascommittent: { value: false, text: strings.hascommittent },
		hasmedical: { value: false, text: strings.hasmedical },
		hasdiscount: { value: false, text: strings.hasdiscount },
		hasfuel: { value: false, text: strings.hasfuel },
		url: { value: false, text: strings.production }
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SHOW_MODAL:
			return { ...state, message: payload, modalVisible: true };
		case SHOW_HEAD_UP:
			return {
				...state,
				headUpMessage: payload.message,
				headUpType: payload.type,
				headUpKey: state.headUpKey + 1
			};
		case HIDE_HEAD_UP:
			return { ...state, headUpMessage: null, headUpType: "" };
		case HIDE_MODAL:
			return { ...state, message: "", modalVisible: false };
		case SHOW_NOTIFICATION:
			return {
				...state,
				notification: true,
				notificationData: payload.data
			};
		case HIDE_NOTIFICATION:
			return { ...state, notification: false, notificationData: {} };

		case SET_SETTINGS:
			return {
				...state,
				settings: payload
			};

		case SET_SETTING_VALUE:
			// let newSettings = state.settings.map((setting, index) => {
			// 	if (index == payload.index) {
			// 		console.log(payload.item, setting);
			// 		setting = payload.item;
			// 	}
			// 	return setting;
			// });

			// return {
			// 	...state,
			// 	settings: newSettings
			// };
			let settings = { ...state.settings, [payload.key]: payload.value };
			console.log({ settings, payload });
			return {
				...state,
				settings
			};

		default:
			return state;
	}
};
