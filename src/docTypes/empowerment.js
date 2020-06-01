export let empowermentEntity = {
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
	vatregcode: ""
};

export let empowermentProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0
};

export let empowermentDoc = {
	empowermentdoc: {
		empowermentno: "",
		empowermentdateofissue: "",
		empowermentdateofexpire: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	agent: {
		fio: "",
		jobtitle: "",
		agenttin: "",
		passport: {
			number: "",
			issuedby: "",
			dateofissue: ""
		}
	},
	sellertin: "",
	buyertin: "",
	seller: empowermentEntity,
	buyer: empowermentEntity,
	productlist: {
		products: []
	}
};
