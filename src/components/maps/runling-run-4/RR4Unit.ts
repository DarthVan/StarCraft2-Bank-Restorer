/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR4Unit **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR4Unit extends SCModule {

	private _exps: Map<number, number>;

	constructor(type: number, level: number = 75) {
		super();

		this._queue[0].update(type);
		this._queue[1].update(this._exps.get(level));
		this._queue[7].update(level);
		this._queue[8].update(level * 4);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override checkData(): boolean {
		const q: SCParam[] = this._queue;
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

		return true;
	}

	public getSum(): number {
		let sum: number = 0;
		for (let i: number = 1; i < 9; i++)
			if (i != 7)
				sum += this._queue[i].current;
		return sum;
	}

	public setLevel(value: number): void {
		this._queue[1].update(this._exps.get(value)); // exp
		this._queue[7].update(value);
		this._queue[8].update(value * 4);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._exps = new Map<number, number>([
			[1, 0], [2, 2], [3, 6], [4, 13], [5, 24], [6, 40], [7, 62], [8, 92], [9, 131], [10, 180],
			[11, 240], [12, 312], [13, 397], [14, 498], [15, 612], [16, 742], [17, 889], [18, 1054], [19, 1238], [20, 1442],
			[21, 1667], [22, 1914], [23, 2184], [24, 2478], [25, 2797], [26, 3142], [27, 3514], [28, 3914], [29, 4343], [30, 4802],
			[31, 5292], [32, 5814], [33, 6369], [34, 6958], [35, 7582], [36, 8242], [37, 8939], [38, 9674], [39, 10448], [40, 11262],
			[41, 12117], [42, 13014], [43, 13954], [44, 14938], [45, 15969], [46, 17042], [47, 18164], [48, 19334], [49, 20553], [50, 21820],
			[51, 23140], [52, 24512], [53, 25937], [54, 27416], [55, 28950], [56, 30540], [57, 32187], [58, 33892], [59, 35656], [60, 37480],
			[61, 39365], [62, 41312], [63, 43322], [64, 45396], [65, 47535], [66, 49739], [67, 52009], [68, 54346], [69, 56751], [70, 59225],
			[71, 61769], [72, 64384], [73, 67072], [74, 69834], [75, 72671]
		]);

		this._queue = [
			new SCParam(2, 300000, 'Unit Type'), // 1-ling, 2-bane, 3-hydra, 4-ultra, 5-roach
			new SCParam(this._exps.get(75), 8100000, 'Exp'), // i1
			new SCParam(0, 320000, 'Regen'),
			new SCParam(0, 330000, 'Energy'),
			new SCParam(0, 340000, 'Speed'),
			new SCParam(0, 350000, 'Skill 1'),
			new SCParam(0, 360000, 'Skill 2'),
			new SCParam(75, 370000, 'Level'), // i7
			new SCParam(75 * 4, 380000, 'Free Points') // i8
		];

	}

}