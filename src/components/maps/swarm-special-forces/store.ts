/* Generated with TypeScript snippets */

import { BasicStore } from "src/store/BasicStore";
import { MParam } from "../MParam";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-02
*/

class Store extends BasicStore {

	public light: MParam[];
	public heavy: MParam[];
	public speed: MParam[][][];
	public options: MParam[];
	public bools: any[];

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: { light?: MParam[], heavy?: MParam[], speed?: MParam[][][], options?: MParam[], bools?: any[] }): void {
		this.light = fields?.light ? [...fields.light] : [];
		this.heavy = fields?.heavy ? [...fields.heavy] : [];
		this.speed = fields?.speed ? [...fields.speed] : [];
		this.options = fields?.options ? [...fields.options] : [];
		this.bools = fields?.bools ? [...fields.bools] : [];
	}

	// Есть возможность мутации - лучий оптимизон, но не забывать про flushSync с занулением поля в ключевых местах
	public updateAt(
		field: 'light' | 'heavy' | 'speed' | 'options' | 'bools',
		index: number | { i: number, j: number, k?: number },
		value: any,
		mutation?: boolean
	): void {
		if (field != 'speed' && typeof index == 'number') {
			if (mutation) {
				this[field][index].value = value;
				return;
			}
			const p: MParam[] = [...this[field]];
			p[index].value = value;
			this[field] = p;
			return;
		}
		if (field == 'speed' && typeof index == 'object') {
			if (mutation) {
				this.speed[index.i][index.j][index.k].value = value; // type = none
				return;
			}
			const p: MParam[][][] = [...this.speed];
			p[index.i][index.j][index.k].value = value;
			this[field] = p;
		}
		if (field == 'bools' && typeof index == 'object') {
			if (mutation) {
				this.bools[index.i].flags[index.j].value = value; // type = none
				return;
			}
			const p: any[] = [...this.bools];
			p[index.i].flags[index.j].value = value;
			this[field] = p;
		}
	}

	public override reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.light = [];
		this.heavy = [];
		this.speed = [];
		this.options = [];
		this.bools = [
			{ part: 0, offset: 0, name: 'Flamer', flags: [] },
			{ part: 0, offset: 1, name: 'Hammer', flags: [] },
			{ part: 0, offset: 2, name: 'Fortress', flags: [] },
			{ part: 1, offset: 0, name: 'Madness', flags: [] },
			{ part: 1, offset: 1, name: 'Atlantis', flags: [] },
			{ part: 1, offset: 2, name: 'Lightning', flags: [] },
			{ part: 1, offset: 3, name: 'Thunder', flags: [] },
			{ part: 2, offset: 0, name: 'Raynor', flags: [] },
			{ part: 2, offset: 1, name: 'Kerrigan', flags: [] },
			{ part: 2, offset: 2, name: 'Artanis', flags: [] },
			{ part: 2, offset: 3, name: 'Cybermind', flags: [] },
			{ part: 3, offset: 0, name: 'Gary', flags: [] },
			{ part: 3, offset: 1, name: 'Stetmann', flags: [] },
			{ part: 3, offset: 2, name: 'Moopy', flags: [] },
			{ part: 0, name: 'FlawlessT', flags: [] },
			{ part: 1, name: 'FlawlessP', flags: [] },
			{ part: 2, name: 'FlawlessM', flags: [] }
		];
	}

}

export default new Store();