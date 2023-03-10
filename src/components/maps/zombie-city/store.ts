/* Generated with TypeScript snippets */

import { SCParam } from "src/core/scarcode/sc-param";
import { BasicStore } from "src/store/BasicStore";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-02
*/

class Store extends BasicStore {

	public queue: SCParam[];

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(queue?: SCParam[]): void {
		this.queue = queue ? [...queue] : [];
	}

	// Есть возможность мутации - лучий оптимизон, но не забывать про flushSync с занулением поля в ключевых местах
	public updateAt(index: number, value: number, mutation?: boolean): void {
		if (mutation) {
			this.queue[index].update(value);
			return;
		}
		const q: SCParam[] = [...this.queue];
		q[index].update(value);
		this.queue = q;
	}

	public fromLocalStorage(params: { _current: number, _max: number, _description: string }[]): void {
		if (!params)
			return;
		const q: SCParam[] = [];
		params.forEach((value: { _current: number, _max: number, _description: string }, index: number): void => {
			q.push(new SCParam(value._current, value._max, value._description));
		});
		this.queue = q;
	}

	public override reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.queue = [
			new SCParam(666, 1000, 'Waves'),
			new SCParam(66666666, 99000000, 'Kills'),
			new SCParam(1, 100000, 'Deaths'),
			new SCParam(666, 50000, 'Games'),
			new SCParam(39960, 1000000, 'Minutes')
		];
	}

}

export default new Store();