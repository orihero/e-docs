export let customerOrderEntity = {
	account: "",
	bankid: "",
	address: "",
	districtid: ""
};

export let customerOrderProduct = {
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
	code: ""
};

export let customerOrderDoc = {
	orderdoc: {
		orderno: "",
		orderdate: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	sellertin: "",
	sellername: "",
	buyertin: "",
	buyername: "",
	seller: customerOrderEntity,
	buyer: customerOrderEntity,
	needdelivery: false,
	productlist: {
		hasvat: false,
		products: []
	}
};
