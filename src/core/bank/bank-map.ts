/* Generated with TypeScript snippets */

/** BankMap **
* ...
* @Author Star Noob
* @Created 2022-09-26
*/

export default class BankMap<T extends { name: string }> extends Map<string, T>{

	private _name: string;

	constructor(name: string, iterable?: Iterable<readonly [string, T]>) {
		super(iterable);
		this._name = name;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override set(key: string, value: T, update: boolean = false): this {
		if (!update)
			this.isValidName(value.name, key);
		return super.set(key, value);
	}

	public sort(): BankMap<T> {
		const collator: Intl.Collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		return new BankMap<T>(this._name,
			[...this.entries()].sort(
				(a: [string, T], b: [string, T]): number => collator.compare(a[0], b[0])
			)
		);
	}

	public override clear(): void {
		// todo: clear all submaps
		super.clear();
	}

	public get name(): string {
		return this._name;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private isValidName(name: string, key?: string): boolean {
		if (key && key != name)
			throw new Error('BankMap: Error! Key ' + key + ' and BankName are different!');
		this.forEach((v: T, k: string): void => {
			if (k == name)
				throw new Error('BankMap: Error! Name ' + name + ' already used!');
		});
		return true;
	}
}