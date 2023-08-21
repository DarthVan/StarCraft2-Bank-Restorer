/* Generated with TypeScript snippets */

import { BankKeyType } from '.';

/** BankKey **
* ...
* @Author Star Noob
* @Created 2022-09-25
*/

export default class BankKey {

	private _name: string;
	private _type: string;
	private _value: string;

	constructor(name: string, type: string, value: string) {
		this._name = name;
		this._type = type;
		this._value = value;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public update(value: string): void {
		this._value = value;
	}

	public get name(): string {
		return this._name;
	}

	public get type(): string {
		return this._type;
	}

	public get value(): any {
		switch (this._type) {
			case BankKeyType.STRING: return this._value; break;
			case BankKeyType.TEXT: return this._value; break;
			case BankKeyType.INT: return parseInt(this._value); break;
			case BankKeyType.FLAG: return this._value == '1' ? true : false; break;
			case BankKeyType.FIXED: return parseFloat(this._value); break;
			case BankKeyType.POINT:
				const strArray: string[] = this._value.split(',');
				return { x: parseFloat(strArray[0]), y: parseFloat(strArray[1]) };
				break;
		}
		return null;
	}

	public get stringValue(): string {
		return this._value;
	}
}