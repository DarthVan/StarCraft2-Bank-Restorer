/* Generated with TypeScript snippets */

import { BankKeyType } from "./bank-key-type";

/** BankKey **
* ...
* @Author Star Noob
* @Created 2022-09-25
*/

export class BankKey {

	private _name: string;
	private _type: string;
	private _value: string;

	constructor(name: string, type: string, value: string) {
		this._name = name;
		this._type = type;
		this._value = value;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public getTypedValue(): any {
		switch (this._type) {
			case BankKeyType.STRING:
			case BankKeyType.TEXT: // uses in SC2 Campaign banks
				return this._value;
				break;
			case BankKeyType.INT:
			case BankKeyType.FLAG: // bool, but no true/false in banks
				return parseInt(this._value);
				break;
			case BankKeyType.FIXED:
				return parseFloat(this._value);
				break;
		}
		return null;
	}

	public update(value: string): void {
		this._value = value;
	}

	public get name(): string {
		return this._name;
	}

	public get type(): string {
		return this._type;
	}

	public get value(): string {
		return this._value;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------
}