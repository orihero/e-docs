import { FieldSize, FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let waybillFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.waybill,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "waybilldoc.waybillno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "waybilldoc.waybilldate"
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
		title: strings.contractdoc,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "tripticketdoc.tripticketno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "tripticketdoc.tripticketdate"
			}
		]
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.truckdoc,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.HALF,
				placeholder: strings.number,
				name: "truckdoc.truckregno"
			},
			{
				type: FieldType.INPUT,
				placeholder: strings.number,
				size: FieldSize.HALF,
				name: "truckdoc.truckmodel"
			}
		]
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.trailerdoc,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "trailerdoc.trailertype"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "trailerdoc.trailerregno"
			}
		]
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "trailerdoc.trailermodel"
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.deliverydistancedoc,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "deliverydistancedoc.deliverydistance"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "deliverydistancedoc.deliverydistanceincity"
			}
		]
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "carriertin",
		title: strings.carrier,
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
		name: "carriername"
	}
];

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
