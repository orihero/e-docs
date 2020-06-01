export let waybillProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	totalsum: 0,
	roadhaulagecost: 0,
	followdocuments: "",
	methoddefineweight: "",
	loadclass: "0",
	weightbrutto: 0,
	weightnetto: 0
};

export let pointDoc = {
	pointofloading: "",
	pointofunloading: ""
};

export let waybillDoc = {
	waybilldoc: {
		waybillno: "",
		waybilldate: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	tripticketdoc: {
		tripticketno: "",
		tripticketdate: ""
	},
	truckdoc: {
		truckregno: "",
		truckmodel: ""
	},
	trailerdoc: {
		trailertype: "0",
		trailerregno: "",
		trailermodel: ""
	},
	deliverydistancedoc: {
		deliverydistance: 0,
		deliverydistanceincity: 0
	},
	carriertin: "",
	carriername: "",
	customertin: "",
	customername: "",
	sellertin: "",
	sellername: "",
	buyertin: "",
	buyername: "",
	giverfio: "",
	giverdriverfio: "",
	takerfio: "",
	takerdriverfio: "",
	pointofredirectname: "",
	pointofredirectaddress: "",
	driverfio: "",
	specialnotes: "",
	deliverytype: "1",
	pointdocs: [],
	productlist: {
		hasvat: false,
		products: []
	}
};
