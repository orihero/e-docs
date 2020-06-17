import strings from "../locales/strings";
import { FieldType, FieldSize } from "../components/generators/FieldsRenderer";

export let universalFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.doc,
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
		placeholder: strings.sender,
		name: "ownerrole",
		title: strings.seller
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "ownertin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		}
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "ownername"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.sender,
		name: "targetrole",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "targettin",
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
		name: "targetname"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.sender,
		name: "target2role",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "target2tin",
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
		name: "target2name"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.sender,
		name: "target3role",
		title: strings.receiver
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "target3tin",
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
		name: "target3name"
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
