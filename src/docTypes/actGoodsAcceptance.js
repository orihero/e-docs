export let actGoodsAcceptanceProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	totalsum: 0,
	vatrate: 0,
	vatsum: 0,
	totalsumwithvat: 0,
	withoutvat: false,
	fuelrate: 0,
	fuelsum: 0,
	totalsumwithfuel: 0
};

export let actGoodsAcceptanceDoc = {
	actdoc: {
		actno: "",
		actdate: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	truckdoc: {
		truckregno: "",
		truckmodel: ""
	},
	sellertin: "",
	sellername: "",
	buyertin: "",
	buyername: "",
	shippertin: "",
	shippername: "",
	consigneetin: "",
	consigneename: "",
	productlist: {
		hasvat: false,
		hasfuel: false,
		products: []
	}
};
