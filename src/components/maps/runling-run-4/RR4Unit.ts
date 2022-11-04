/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR4Unit **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR4Unit extends SCModule {

	constructor(type: number, level: number = 75, exp: number = 1234567) {
		super();

		this._queue[0].update(type);
		this._queue[1].update(exp);
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
		this._queue[7].update(value);
		this._queue[8].update(value * 4);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [
			new SCParam(2, 300000, 'Unit Type'), // 1-ling, 2-bane, 3-hydra, 4-ultra, 5-roach
			new SCParam(200000, 8100000, 'Exp'), // i1
			new SCParam(0, 320000, 'Regen'),
			new SCParam(0, 330000, 'Energy'),
			new SCParam(0, 340000, 'Speed'),
			new SCParam(0, 350000, 'Skill 1'),
			new SCParam(0, 360000, 'Skill 2'),
			new SCParam(75, 370000, 'Level'), // i7
			new SCParam(300, 380000, 'Free Points') // i8
		];

	}

}