/* Generated with TypeScript snippets */

import { StarCode } from "./starcode";

/** SCParam **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

export class SCParam {

	private _current: number;
	private _max: number;
	private _description: string;

	constructor(current: number, max: number, description: string = '') {
		this._current = current;
		this._max = max;
		this._description = description;
	}

	public update(current: number): SCParam {
		this._current = current;
		return this;
	}

	public writeTo(starCode: StarCode): void {
		starCode.setInt(this._current, this._max);
	}

	public get current(): number {
		return this._current;
	}

	public get max(): number {
		return this._max;
	}

	public get description(): string {
		return this._description;
	}
}