/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR4Info **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR4Info extends SCModule {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	// sum of all stats params
	public getSum(): number {
		let sum: number = 0;
		for (let i: number = 0; i < 17; i++)
			if (i < 10 || i > 12)
				sum += this._queue[i].current;
		return sum;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [

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

	}

}