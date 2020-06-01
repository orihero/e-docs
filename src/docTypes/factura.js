export let factureEntity = {
	name: "",
	account: "",
	bankid: "",
	address: "",
	mobile: "",
	workphone: "",
	oked: "",
	districtid: "",
	director: "",
	accountant: "",
	vatregcode: "",
	treasuryaccount: "",
	personalaccount: ""
};

export let facturaProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	deliverysum: 0,
	vatrate: 0,
	vatsum: 0,
	deliverysumwithvat: 0,
	withoutvat: false,
	fuelrate: 0,
	fuelsum: 0,
	deliverysumwithfuel: 0,
	series: "",
	baseprice: 0,
	extracharge: 0
};

export let facturaDoc = {
	facturadoc: {
		facturano: "",
		facturadate: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	facturaempowermentdoc: {
		empowermentno: "",
		empowermentdateofissue: "",
		agentfio: "",
		agenttin: ""
	},
	itemreleaseddoc: {
		itemreleasedfio: "",
		itemreleasedtin: ""
	},
	sellertin: "",
	buyertin: "",
	seller: factureEntity,
	buyer: factureEntity,
	productlist: {
		hasvat: false,
		hasfuel: false,
		hasdiscount: false,
		hasseries: false,
		hasfarm: false,
		discountrate: 0,
		discountsum: 0,
		discountvatsum: 0,
		products: []
	}
};
