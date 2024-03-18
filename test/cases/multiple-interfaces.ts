interface BaseOptionType<T> {
	available: Ref<boolean | undefined>;
	defaultValue: T | undefined;
	name: string;
	required: Ref<boolean>;
	type: string;
	value: Ref<T | undefined>;
}

interface OptionTypeSelect<T> extends BaseOptionType<T> {
	options: Ref<T[]>;
	type: 'select';
}

interface OptionTypeString extends BaseOptionType<string> {
	placeholder: string | null;
	type: 'string';
}