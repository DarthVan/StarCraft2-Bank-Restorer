/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** ZCModule **
* result sample: '/oRJGd}MDZB*Je'
* @Author Star Noob
* @Created 2022-10-28
*/

export class ZcStats extends SCModule {

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [
			new SCParam(666, 1000, 'Waves'),
			new SCParam(66666666, 99000000, 'Kills'),
			new SCParam(666, 100000, 'Deaths'),
			new SCParam(666, 50000, 'Games'),
			new SCParam(39960, 1000000, 'Minutes')
		];
	}

}