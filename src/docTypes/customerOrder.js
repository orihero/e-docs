import { FieldType, FieldSize } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let customerOrderFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.actWorkPerformed,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "orderdoc.orderno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "orderdoc.orderdate"
			}
		]
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.contract,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "contractdoc.contractno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "contractdoc.contractdate"
			}
		]
	},
	{
		type: FieldType.CHECKBOX,
		placeholder: strings.needdelivery,
		size: FieldSize.FULL,
		name: "needdelivery",
		title: strings.needdelivery
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "sellertin",
		title: strings.seller,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad",
			disabled: true
		},
		disabled: true
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "sellername",
		disabled: true
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "buyertin",
		title: strings.buyer,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "buyername",
		disabled: true
	}
];

export let customerOrderEntity = {
	account: "",
	bankid: "",
	address: "",
	districtid: ""
};

export let customerOrderProduct = {
	ordno: 0,
	name: "",
	measureid: -1,
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
	needdelivery: false,
	sellertin: "",
	sellername: "",
	buyertin: "",
	buyername: "",
	seller: customerOrderEntity,
	buyer: customerOrderEntity,
	productlist: {
		hasvat: false,
		products: []
	}
};
