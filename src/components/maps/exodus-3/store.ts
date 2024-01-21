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
	public options: MParam[];

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(params?: MParam[]): void {
		this.resources = params ? [...params] : [];
	}

	public updateOption(index: number, value: boolean, mutation?: boolean): void {
		if (mutation) {
			this.options[index].value = value;
			return;
		}
		const p: MParam[] = [...this.options];
		p[index].value = value;
		this.options = p;
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
			{ type: 'number', value: 90000000, description: 'Vanadium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Chromium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Titanium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Tungsten', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Gold', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Noobium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Osmium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Iridium', min: 0, max: 90000000, tip: '0 - 90000000' },
			{ type: 'number', value: 90000000, description: 'Palladium', min: 0, max: 90000000, tip: '0 - 90000000' }
		];

		this.options = [
			{ type: 'boolean', value: true, description: 'Unlock all stuff', tip: 'Unlock all hidden weapons, PAs, turrets, structures' },
			{ type: 'boolean', value: true, description: 'Upgrade all stuff', tip: 'Set 20 level and 10 prestige for any stuff' },
			{ type: 'boolean', value: false, description: 'Overload mod points', tip: 'Avoid to use this, its a real cheats :D' },
		]
	}

}

export default new Store();