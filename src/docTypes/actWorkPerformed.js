export let actWorkPerformedProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	totalsum: 0,
	vatrate: 0,
	vatsum: 0,
	totalsumwithvat: 0,
	withoutvat: false
};

export let actWorkPerformedDoc = {
	actdoc: {
		actno: "",
		actdate: "",
		acttext: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	sellertin: "",
	sellername: "",
	buyertin: "",
	buyername: "",
	productlist: {
		hasvat: false,
		products: []
	}
};
