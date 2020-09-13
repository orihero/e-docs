import { FieldType, FieldSize } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let actWorkPerformedFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.actWorkPerformed,
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
		type: FieldType.INPUT,
		placeholder: strings.description,
		size: FieldSize.FULL,
		name: "actdoc.acttext"
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
		disabled: true,
		name: "sellername"
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
	}
];

export let actWorkPerformedProduct = {
	withoutvat: false,
	ordno: 0,
	name: "",
	measureid: -1,
	count: 0,
	summa: 0,
	totalsum: 0,
	vatrate: 0,
	vatsum: 0,
	totalsumwithvat: 0
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
