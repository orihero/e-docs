import strings from "../locales/strings";
import { FieldType, FieldSize } from "../components/generators/FieldsRenderer";
import requests from "../api/requests";

export let universalFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.universal,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "doc.docno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "doc.docdate"
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
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.role,
		name: "ownerrole",
		title: strings.sender
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "ownertin",
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
		name: "ownername"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.role,
		name: "targetrole",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "targettin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		child: "targetname"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "targetname"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.role,
		name: "target2role",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "target2tin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		child: "target2name"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "target2name"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.role,
		name: "target3role",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "target3tin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		child: "target3name"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "target3name"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.doctype,
		size: FieldSize.FULL,
		name: "doctype",
		title: strings.documentDetails
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.totalsum,
		size: FieldSize.FULL,
		name: "productList.totalsum"
	},
	{
		type: FieldType.FILE,
		placeholder: strings.selectFile,
		size: FieldSize.FULL,
		name: "file",
		title: strings.clear
	}
];

export let universalDoc = {
	doc: {
		docno: "", // номер документа
		docdate: "" // дата документа
	},
	contractdoc: {
		contractno: "", // договор номер
		contractdate: "" // договор дата
	},
	roumingId: "", // ИД Роуминга, должен быть получен из роуминга для сохранения сквозной уникальности документов между операторами
	ownertin: "", // Отправитель ИНН
	ownername: "", // Отправитель Наименование
	ownerrole: "", // Отправитель Роль, произвольный (Поставщик, Агент и т. д.)
	targettin: "", // Получатель ИНН
	targetname: "", // Получатель Наименование
	targetrole: "", // Получатель Роль
	target2tin: "", // (Не обязательный) Получатель 2 ИНН
	target2name: "", // (Не обязательный) Получатель 2 Наименование
	target2role: "", // (Не обязательный) Получатель 2 Роль
	target3tin: "", // (Не обязательный) Получатель 3 ИНН
	target3name: "", // (Не обязательный) Получатель 3 Наименование
	target3role: "", // (Не обязательный) Получатель 3 Роль
	type: "", // Системный Тип документа, заполняется программно, используется системой оператора для правильной обработки данных документа
	doctype: "", // Тип документа, произвольный, заполняется отправителем документа (Договор, Доп. соглашение и т. д.)
	data: "", // Произвольная структура данных в формате JSON
	productlist: {
		// Не обязательные Общие для всех документов поля, приведены в соответствие с стандартом роуминга
		hasvat: false, //
		totalsum: 0, //
		vatrate: 0, //
		totalvatsum: 0, //
		totalsumwithvat: 0, //
		products: "" // Произвольная структура дополнительных колонок в формате JSON
	},
	file: {
		// Данные файла
		filebase64: "", // Двоичные данные файла в Base64
		filename: "", // Имя файла
		filetype: "" // Формат файла (application/pdf, image/jpeg и т д.) Используется для правильного отображения документа
	}
};
