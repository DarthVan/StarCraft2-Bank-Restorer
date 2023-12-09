/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';
import { MParam } from '../MParam';

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-02
*/

class Store {

	public params: MParam[];

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(params?: MParam[]): void {
		this.params = params ? [...params] : [];
	}

	public updateAt(index: number, value: number | string, mutation?: boolean): void {
		if (mutation) {
			this.params[index].value = value;
			return;
		}
		const p: MParam[] = [...this.params];
		p[index].value = value;
		this.params = p;
	}

	public reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {
		this.params = [
			{ type: 'string', value: 'Hero', description: 'Rank' },

			{ type: 'number', value: 9999999, description: 'Total Kills', min: 0, max: 9999999, tip: '0 - 9999999' },
			{ type: 'number', value: 9999999, description: 'Score', min: 0, max: 9999999, tip: '0 - 9999999' },

			{ type: 'number', value: 9999999, description: 'Easy Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
			{ type: 'number', value: 9999999, description: 'Medium Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
			{ type: 'number', value: 9999999, description: 'Hard Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
			{ type: 'number', value: 9999999, description: 'Hell Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
		];
	}

}

export default new Store();