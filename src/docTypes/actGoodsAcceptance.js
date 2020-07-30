import { FieldSize, FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let actGoodsAcceptanceFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.actGoodsAcceptance,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "actdoc.actno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "actdoc.actdate"
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
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.truck,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.HALF,
				placeholder: strings.carNumber,
				name: "truckdoc.truckregno"
			},
			{
				type: FieldType.INPUT,
				placeholder: strings.carModel,
				size: FieldSize.HALF,
				name: "truckdoc.truckmodel"
			}
		]
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
		name: "buyername"
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "shippertin",
		title: strings.truckSender,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		child: "shippername",
		parent: "other"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "shippername"
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "consigneetin",
		title: strings.truckReceiver,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		parent: "other",
		child: "consigneename"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "consigneename"
	}
];

export let actGoodsAcceptanceProduct = {
	withoutvat: false,
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	totalsum: 0,
	vatrate: 0,
	vatsum: 0,
	totalsumwithvat: 0,
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
