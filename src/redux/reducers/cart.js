import { CART_LAODED } from "../types";

const initialState = {
	data: {},
	products: [],
	filters: { page: 1, limit: 20 }
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case CART_LAODED:
			return payload;
		default:
			return state;
	}
};
