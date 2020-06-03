import { FieldSize, FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";

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
	// {
	// 	type: FieldType.LINE,
	// 	size: FieldSize.FULL,
	// 	title: strings.contract,
	// 	columns: [
	// 		{
	// 			type: FieldType.INPUT,
	// 			size: FieldSize.HALF,
	// 			placeholder: strings.number,
	// 			name: "truckdoc.truckregno"
	// 		},
	// 		{
	// 			type: FieldType.INPUT,
	// 			placeholder: strings.selectDate,
	// 			size: FieldSize.HALF,
	// 			name: "truckdoc.truckmodel"
	// 		}
	// 	]
	// },
	// {
	// 	type: FieldType.LINE,
	// 	size: FieldSize.FULL,
	// 	columns: [
	// 		{
	// 			type: FieldType.INPUT,
	// 			title: strings.documentNumber,
	// 			size: FieldSize.HALF,
	// 			placeholder: strings.number,
	// 			name: "truckdoc.truckregno"
	// 		},
	// 		{
	// 			type: FieldType.INPUT,
	// 			placeholder: strings.selectDate,
	// 			size: FieldSize.HALF,
	// 			title: strings.selectDate,
	// 			name: "truckdoc.truckmodel"
	// 		}
	// 	]
	// },
	{
		type: FieldType.INPUT,
		title: strings.sellertin,
		placeholder: strings.sellertin,
		size: FieldSize.FULL,
		name: "sellertin"
		// fetch: requests.user.getRequisite
	},
	{
		type: FieldType.INPUT,
		title: strings.recieverInn,
		placeholder: strings.recieverInn,
		size: FieldSize.FULL,
		name: "sellername"
		// fetch: requests.user.getRequisite
	},
	{
		type: FieldType.INPUT,
		title: strings.recieverInn,
		placeholder: strings.recieverInn,
		size: FieldSize.FULL,
		name: "buyertin"
		// fetch: requests.user.getRequisite
	},
	{
		type: FieldType.INPUT,
		title: strings.recieverInn,
		placeholder: strings.reciever,
		size: FieldSize.FULL,
		name: "buyername"
		// fetch: requests.user.getRequisite
	}
	// {
	// 	type: FieldType.INPUT,
	// 	title: strings.recieverInn,
	// 	placeholder: strings.recieverInn,
	// 	size: FieldSize.FULL,
	// 	name: "shippertin"
	// 	// fetch: requests.user.getRequisite
	// },
	// {
	// 	type: FieldType.INPUT,
	// 	title: strings.recieverInn,
	// 	placeholder: strings.recieverInn,
	// 	size: FieldSize.FULL,
	// 	name: "shippername"
	// 	// fetch: requests.user.getRequisite
	// },
	// {
	// 	type: FieldType.INPUT,
	// 	title: strings.recieverInn,
	// 	placeholder: strings.recieverInn,
	// 	size: FieldSize.FULL,
	// 	name: "consigneetin"
	// 	// fetch: requests.user.getRequisite
	// },
	// {
	// 	type: FieldType.INPUT,
	// 	title: strings.recieverInn,
	// 	placeholder: strings.recieverInn,
	// 	size: FieldSize.FULL,
	// 	name: "consigneename"
	// 	// fetch: requests.user.getRequisite
	// }
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
