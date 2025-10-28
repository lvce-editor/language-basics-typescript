function foo(value: string): void {
	const regex = /sql`/gu;

	const matches = value.matchAll(regex);
	const template = `sql\n${value}`;
}