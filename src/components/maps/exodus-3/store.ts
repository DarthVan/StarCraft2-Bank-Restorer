/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';
import { MParam } from '../MParam';

/** Store **
* ...
* @Author Star Noob
* @Created 2024-01-14
*/

class Store {

	public resources: MParam[];

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(params?: MParam[]): void {
		this.resources = params ? [...params] : [];
	}

	public updateAt(index: number, value: number | string, mutation?: boolean): void {
		if (mutation) {
			this.resources[index].value = value;
			return;
		}
		const p: MParam[] = [...this.resources];
		p[index].value = value;
		this.resources = p;
	}

	public reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {
		this.resources = [
			{ type: 'number', value: 10000000, description: 'Vanadium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Chromium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Titanium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Tungsten', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Gold', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Noobium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Osmium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Iridium', min: 0, max: 10000000, tip: '0 - 10000000' },
			{ type: 'number', value: 10000000, description: 'Palladium', min: 0, max: 10000000, tip: '0 - 10000000' },
		];
	}

}

export default new Store();