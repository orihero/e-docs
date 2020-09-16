import {
	SHOW_MODAL,
	HIDE_MODAL,
	SHOW_HEAD_UP,
	HIDE_HEAD_UP,
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
	SET_SETTING_VALUE,
	SET_SETTINGS
} from "../types";

export const setSettings = payload => ({
	type: SET_SETTINGS,
	payload
});

export const showModal = payload => ({
	type: SHOW_MODAL,
	payload
});

export const hideModal = () => ({
	type: HIDE_MODAL
});

export const showMessage = payload => ({
	type: SHOW_HEAD_UP,
	payload
});

export const hideMessage = payload => ({
	type: HIDE_HEAD_UP
});

export const showNotification = payload => ({
	type: SHOW_NOTIFICATION,
	payload
});

export const hideNotification = payload => ({
	type: HIDE_NOTIFICATION
});

export const setSettingsValue = payload => ({
	type: SET_SETTING_VALUE,
	payload
});
