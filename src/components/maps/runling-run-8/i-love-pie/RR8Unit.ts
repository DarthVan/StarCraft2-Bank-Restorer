/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR8Unit **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR8Unit extends SCModule {

	private _exps: number[];

	constructor(type: number, level: number = 100) {
		super();

		this._queue[0].update(type);
		this._queue[1].update(this._exps[level - 1]);
		this._queue[7].update(level);
		this._queue[8].update(level * 4);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override checkData(): boolean {
		const q: SCParam[] = this._queue;
		const p: number = q[2].current + q[3].current + q[4].current + q[8].current + (q[5].current + q[6].current) * 4;

		if (p < 0 || p > 400)
			throw new Error('Points out of range (0-300)!');

		if (q[0].current < 0 || q[0].current > 8)
			throw new Error('Undefined unit type! Use 0, 1, 2, 3, 4, 5, 6, 7, 8'); // 0 - type not used

		if (q[7].current < 1 || q[7].current > 100)
			throw new Error('Unit level out of range (1-100)!');

		if (q[7].current * 4 != p)
			throw new Error('level or scores are incorrect!');

		if (q[2].current > 200 || q[3].current > 200 || q[4].current > 200) // ?
			throw new Error('Energy, regen, speed: 200 max');

		if (q[5].current > 20 || q[6].current > 20) // ?
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
		this._queue[1].update(this._exps[value - 1]);
		this._queue[7].update(value);
		this._queue[8].update(value * 4);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._exps = [
			0, 3, 10, 22, 40, 65, 98, 140, 192, 255, // 1,2,3...10
			330, 418, 520, 637, 770, 920, 1088, 1275, 1482, 1710, // 11...20
			1960, 2233, 2530, 2852, 3200, 3575, 3978, 4410, 4872, 5365, // 21...30
			5890, 6448, 7040, 7667, 8330, 9030, 9768, 10545, 11362, 12220, // 31...40
			13120, 14063, 15095, 16173, 17298, 18471, 19693, 20965, 22288, 23663, // 41...50
			25091, 26573, 28110, 29703, 31353, 33061, 34828, 36655, 38543, 40493, // 51...60
			42506, 44583, 46725, 48933, 51208, 53551, 55963, 58445, 60998, 63623, // 61...70
			66321, 69093, 72016, 75016, 78094, 81251, 84488, 87806, 91206, 94689, // 71...80
			98256, 101908, 105646, 109471, 113384, 117386, 121478, 125661, 129936, 134304, // 81...90
			138766, 143323, 147976, 152726, 157574, 162521, 167568, 172716, 177966, 183319 // 91...100
		];

		this._queue = [
			new SCParam(2, 300000, 'Unit Type'), // 1-ling, 2-bane, 3-hydra, 4-ultra, 5-roach
			new SCParam(this._exps[99], 8100000, 'Exp'), // i1
			new SCParam(0, 320000, 'Regen'),
			new SCParam(0, 330000, 'Energy'),
			new SCParam(0, 340000, 'Speed'),
			new SCParam(0, 350000, 'Skill 1'),
			new SCParam(0, 360000, 'Skill 2'),
			new SCParam(100, 370000, 'Level'), // i7
			new SCParam(100 * 4, 380000, 'Free Points') // i8
		];

	}

}