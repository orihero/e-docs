import { CART_LAODED } from "../types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case CART_LAODED:
			return payload;
		default:
			return state;
	}
};
