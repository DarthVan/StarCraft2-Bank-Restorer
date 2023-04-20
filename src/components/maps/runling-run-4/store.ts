/* Generated with TypeScript snippets */

import { SCParam } from "src/core/starcode/sc-param";
import { BasicStore } from "src/store/BasicStore";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-05
*/

class Store extends BasicStore {

	public camera: SCParam[]; // checksums
	public info: SCParam[]; // stats and settings
	public slots: SCParam[];
	public units: SCParam[][];

	private _exp: number[]; // levels exps (0-74 → 1-75)

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: { info?: SCParam[], units?: SCParam[][] }): void {
		this.info = fields?.info ? [...fields.info] : [];
		this.units = fields?.units ? [...fields.units] : [];
	}

	// Есть возможность мутации - лучий оптимизон, но не забывать про flushSync с занулением поля в ключевых местах
	public updateAt<T extends number | { param: number, value: number }>(field: 'camera' | 'info' | 'slots' | 'units', index: number, value: T, mutation?: boolean): void {
		if (field != 'units' && typeof value == 'number') {
			if (mutation) {
				this[field][index].update(value);
				return;
			}
			const p: SCParam[] = [...this[field]];
			p[index].update(value);
			this[field] = p;
			return;
		}
		// для units index - индекс юнита, а value - kv
		if (field == 'units' && typeof value == 'object') {
			if (mutation) {
				if (!value) {
					this.units[index][0].update(0); // type = none
					return;
				}
				this.units[index][value.param].update(value.value);
				return;
			}
			const p: SCParam[][] = [...this.units];
			if (!value)
				p[index][0].update(0); // type = none
			else
				p[index][value.param].update(value.value);
			this[field] = p;
		}
	}

	public setUnit(slot: number, unit?: { type?: number, level?: number }, mutation?: boolean): void {
		if (slot < 0 || slot > 7)
			throw new Error('RLR4 Store: setUnit: slot is out of range!');

		if (!unit) {
			//this.updateAt('slots', slot, 0, mutation);
			this.updateAt('units', slot, null, mutation);
			return;
		}

		if (typeof unit.type == 'number') {
			//this.updateAt('slots', slot, { param: 0, value: unit.type > 0 ? 1 : 0 }, mutation);
			this.updateAt('units', slot, { param: 0, value: unit.type }, mutation);
		}

		if (unit.level) {
			this.updateAt('units', slot, { param: 1, value: this._exp[unit.level - 1] }, mutation);
			this.updateAt('units', slot, { param: 7, value: unit.level }, mutation);
			this.updateAt('units', slot, { param: 8, value: unit.level * 4 }, mutation);
		}
	}

	public fromLocalStorage(fields: {
		units: { _current: number, _max: number, _description: string }[][],
		info: { _current: number, _max: number, _description: string }[]
	}): void {
		if (!fields)
			return;

		// 1. units:
		const units: SCParam[][] = [];
		fields.units.forEach((unit: { _current: number, _max: number, _description: string }[], i: number): void => {
			const params: SCParam[] = [];
			unit.forEach((param: { _current: number, _max: number, _description: string }, j: number): void => {
				params.push(new SCParam(param._current, param._max, param._description));
			});
			units.push(params)
		});
		this.units = units;

		// 2. info:
		const info: SCParam[] = [];
		fields.info.forEach((param: { _current: number, _max: number, _description: string }, i: number): void => {
			info.push(new SCParam(param._current, param._max, param._description));
		});
		this.info = info;
	}

	public updateChecksums(paylerNumber: number, mutation?: boolean): void {
		for (let i: number; i < 8; i++)
			this.updateAt('slots', i, this.units[i][0] ? 1 : 0, mutation);
		this.updateAt('camera', 0, this.sumOfStats, mutation);
		this.updateAt('camera', 1, this.sumOfUnits + paylerNumber, mutation);
	}

	public override reset(): void {
		this.init();
	}

	public get sumOfStats(): number {
		let sum: number = 0;
		for (let i: number = 0; i < 17; i++)
			if (i < 10 || i > 12)
				sum += this.info[i].current;
		return sum;
	}

	public get sumOfUnits(): number {
		let sum: number = 0;
		this.units.forEach((unit: SCParam[]): void => {
			if (unit[0].current > 0) // if unit type != 'empty'
				for (let i: number = 1; i < 9; i++)
					if (i != 7)
						sum += unit[i].current;
		});
		return sum;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {

		this.camera = [ // checksums
			new SCParam(0, 99000000, 'Sum of all stats'),
			new SCParam(0, 98000000, 'Sum of all units and account')
		];

		this.info = [ // stats and settings

			// stats
			new SCParam(500, 190000, 'Normal games'),
			new SCParam(25, 100000, 'Normal games won'),

			new SCParam(55, 110000, 'Hard games'),
			new SCParam(5, 120000, 'Hard games won'),

			new SCParam(12000, 90300000, 'Total saves'),
			new SCParam(99999, 94000000, 'Total score'),
			new SCParam(2000, 96000000, 'Total deaths'),

			new SCParam(200, 150000, 'Boss1 kills'),
			new SCParam(100, 160000, 'Boss2 kills'),
			new SCParam(25, 170000, 'Boss3 kills'),

			new SCParam(25, 180000, 'Insane games'), // -
			new SCParam(2, 190000, 'Insane games won'), // -

			new SCParam(1, 200000, 'Not used'), // bank03  i12

			new SCParam(5, 210000, 'Time mode games'),
			new SCParam(1, 220000, 'Time mode games won'),
			new SCParam(99999, 230000, 'Minigame high score'),
			new SCParam(999, 240000, 'Time mode best score'),


			// settings
			new SCParam(72, 1000, 'Distance'),
			new SCParam(90, 1001, 'Rotation'),
			new SCParam(90, 1002, 'Angle'),
			new SCParam(1, 1003, 'Camera follow unit'),
			new SCParam(0, 1004, 'Hide tips'),
			new SCParam(1, 1005, 'Hud on'),
			new SCParam(0, 1006, 'Mini map'),
			new SCParam(0, 1007, 'Energy bar'),
			new SCParam(0, 1008, 'Exp bar'),
			new SCParam(0, 1009, 'Menu'),
			new SCParam(1, 1010, 'WASD'),
			new SCParam(0, 10, 'Increase distance'),
			new SCParam(0, 11, 'Decrease distance'),
			new SCParam(0, 12, 'Rotation right'),
			new SCParam(0, 13, 'Rotation left'),
			new SCParam(1, 14, 'Follow runling')
		];

		this.slots = [
			new SCParam(1, 425, 'Slot 1'),
			new SCParam(1, 426, 'Slot 2'),
			new SCParam(1, 427, 'Slot 3'),
			new SCParam(1, 428, 'Slot 4'),
			new SCParam(1, 429, 'Slot 5'),
			new SCParam(1, 430, 'Slot 6'),
			new SCParam(1, 431, 'Slot 7'),
			new SCParam(1, 432, 'Slot 8')
		];

		this.units = [];
		for (let i: number = 0; i < 8; i++)
			this.units.push(
				[
					new SCParam(2, 300000, 'Unit Type'), // 1-ling, 2-bane, 3-hydra, 4-ultra, 5-roach
					new SCParam(300000, 8100000, 'Exp'), // i1
					new SCParam(0, 320000, 'Regen'),
					new SCParam(0, 330000, 'Energy'),
					new SCParam(0, 340000, 'Speed'),
					new SCParam(0, 350000, 'Skill 1'),
					new SCParam(0, 360000, 'Skill 2'),
					new SCParam(75, 370000, 'Level'), // i7
					new SCParam(300, 380000, 'Free Points') // i8
				]
			);

		this._exp = [0, 2, 6, 13, 24, 40, 62, 92, 131, 180,
			240, 312, 397, 498, 612, 742, 889, 1054, 1238, 1442,
			1667, 1914, 2184, 2478, 2797, 3142, 3514, 3914, 4343, 4802,
			5292, 5814, 6369, 6958, 7582, 8242, 8939, 9674, 10448, 11262,
			12117, 13014, 13954, 14938, 15969, 17042, 18164, 19334, 20553, 21820,
			23140, 24512, 25937, 27416, 28950, 30540, 32187, 33892, 35656, 37480,
			39365, 41312, 43322, 45396, 47535, 49739, 52009, 54346, 56751, 59225,
			61769, 64384, 67072, 69834, 72671];
	}

	protected get isUnitsCorrect(): boolean {
		this.units.forEach((q: SCParam[]): void => {
			const p: number = q[2].current + q[3].current + q[4].current + q[8].current + (q[5].current + q[6].current) * 4;

			if (p < 0 || p > 300)
				throw new Error('Points out of range (0-300)!');

			if (q[0].current < 1 || q[0].current > 5)
				throw new Error('Undefined unit type! Use 1, 2, 3, 4 or 5');

			if (q[7].current < 1 || q[7].current > 75)
				throw new Error('Unit level out of range (1-75)!');

			if (q[7].current * 4 != p)
				throw new Error('level or scores are incorrect!');

			if (q[2].current > 200 || q[3].current > 200 || q[4].current > 200)
				throw new Error('Energy, regen, speed: 200 max');

			if (q[5].current > 20 || q[6].current > 20)
				throw new Error('Skill: 20 max');
		})
		return true;
	}

}

export default new Store();