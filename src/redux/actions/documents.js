import { DOCUMENTS_COUNT_LOADED, DOCUMENTS_LOADED } from "../types";

export const documentsLoaded = payload => ({
	type: DOCUMENTS_LOADED,
	payload
});


export const documentsCountLoaded = payload => ({
	type: DOCUMENTS_COUNT_LOADED,
	payload
});
