export const getObjectProperty = (obj, path) => {
	if (!obj || !path) {
		return null;
	}
	let paths = path.split(".");
	let temp = obj;
	for (let key of paths) {
		if (!temp[key]) {
			return null;
		}
		temp = temp[key];
	}
	return temp;
};

export let normalizeFilters = data => {
	return Object.keys(data).reduce((prev, key) => {
		return `${prev + key}=${data[key] ? data[key] : ""}&`;
	}, "?");
};

export let removeKeyFromObject = (obj, keyToFind) => {
	return Object.keys(obj).reduce((prev, current, index) => {
		if (keyToFind !== current) return { ...prev, [current]: obj[current] };
		return prev;
	}, {});
};

export function convertToTypeOf(typevar, input) {
	let type = typeof typevar;
	switch (type) {
		case "string":
			return String.bind(null, input)();
		case "number":
			return Number.bind(null, input)();
		case "boolean":
			return input == "true" ? true : false;
		default:
			throw "Unsupported type";
	}
}
