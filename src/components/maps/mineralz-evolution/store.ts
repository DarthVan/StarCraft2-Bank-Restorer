/* Generated with TypeScript snippets */

import { r } from '@src/utils/utils';
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

	public updateAt(index: number, value: number, mutation?: boolean): void {
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
		// 15 prestige = 300 wins±
		const prestige: number = r(1, 40);
		let totalRoleWins: number = prestige * 20; // 300

		const economy: number = Math.floor(r(totalRoleWins * 0.3, totalRoleWins * 0.5));
		totalRoleWins -= economy;

		const wall: number = Math.floor(r(totalRoleWins * 0.2, totalRoleWins * 0.4));
		totalRoleWins -= wall;

		const cannons: number = Math.floor(r(totalRoleWins * 0.1, totalRoleWins * 0.3));
		totalRoleWins -= cannons;

		const healer: number = Math.floor(r(totalRoleWins * 0.2, totalRoleWins * 0.5));
		totalRoleWins -= healer;

		const generator: number = totalRoleWins;

		const impossible: number = prestige > 0 ? (prestige > 5 ? 35 : r(0, 15)) : 0;

		this.params = [
			{ type: 'number', value: prestige, description: 'Prestige', min: 0, max: 100, tip: '0 - 100' },
			{ type: 'number', value: r(25, 175), description: 'Level', min: 1, max: 200, tip: '1 - 200' },
			{ type: 'number', value: r(25, 125), description: 'Wins', min: 0, max: 419, tip: '0 - 419' }, // 419 max

			{ type: 'number', value: 35, description: 'Nights', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: 35, description: 'Elite', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: 35, description: 'Nightmare', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: 35, description: 'Hell', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: impossible, description: 'Impossible', min: 0, max: 35, tip: '0 - 35' },

			{ type: 'number', value: wall, description: 'Wall', min: 0, max: 999999 }, // 8
			{ type: 'number', value: cannons, description: 'Cannons', min: 0, max: 999999 },
			{ type: 'number', value: healer, description: 'Healer', min: 0, max: 999999 },
			{ type: 'number', value: generator, description: 'Generator', min: 0, max: 999999 },
			{ type: 'number', value: economy, description: 'Economy', min: 0, max: 999999 }
		];
	}

}

export default new Store();