/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR4Slots **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR4Slots extends SCModule {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public enableAll(): void {
		this._queue.forEach((p: SCParam): void => {
			p.update(1);
		});
	}

	public disableAll(): void {
		this._queue.forEach((p: SCParam): void => {
			p.update(0);
		});
	}

	public setSlot(index: number, enabled: boolean = true): void {
		this._queue[index].update(enabled ? 1 : 0);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [
			new SCParam(1, 425, 'Slot 1'),
			new SCParam(1, 426, 'Slot 2'),
			new SCParam(1, 427, 'Slot 3'),
			new SCParam(1, 428, 'Slot 4'),
			new SCParam(1, 429, 'Slot 5'),
			new SCParam(1, 430, 'Slot 6'),
			new SCParam(1, 431, 'Slot 7'),
			new SCParam(1, 432, 'Slot 8')
		];

	}

}