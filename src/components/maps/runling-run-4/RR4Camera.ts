/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR4Camera **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR4Camera extends SCModule {

	protected override init(): void {
		super.init();

		this._queue = [
			new SCParam(0, 99000000, 'Sum of all stats'),
			new SCParam(0, 98000000, 'Sum of all units and account')
		];

	}
}