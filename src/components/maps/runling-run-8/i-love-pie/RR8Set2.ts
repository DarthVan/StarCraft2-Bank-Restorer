/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR8Set2 **
* ...
* @Author Star Noob
* @Created 2022-11-11
*/

export class RR8Set2 extends SCModule {

	constructor(playerPrfxNumber: number) {
		super();

		this._queue[0].update(playerPrfxNumber);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [
			new SCParam(1, 97000000, 'PlayerID last number'),
		];

	}

}