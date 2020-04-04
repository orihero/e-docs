import { SHOW_MODAL, HIDE_MODAL, SHOW_HEAD_UP, HIDE_HEAD_UP } from "../types";

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
