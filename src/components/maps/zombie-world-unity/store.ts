/* Generated with TypeScript snippets */

import { BasicStore } from "src/store/BasicStore";
import { MParam } from "../MParam";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-02
*/

class Store extends BasicStore {

	public params: MParam[];

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: MParam[]): void {
		this.params = fields ? [...fields] : [];
	}

	// Есть возможность мутации - лучий оптимизон, но не забывать про flushSync с занулением поля в ключевых местах
	public updateAt(index: number, value: number | boolean, mutation?: boolean): void {
		if (mutation) {
			this.params[index].value = value;
			return;
		}
		const p: MParam[] = [...this.params];
		p[index].value = value;
		this.params = p;
	}

	public override reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.params = [
			{ type: "number", value: 16999, description: 'Waves' },
			{ type: "number", value: 45000, description: 'Talent points' },

			{ type: "boolean", value: true, description: 'Fill all talents' },
			{ type: "boolean", value: true, description: 'Get all challenges' },
			{ type: "boolean", value: true, description: 'Upgrade all units' },

			{ type: "number", value: 999000000, description: 'Assassin' },
			{ type: "number", value: 999000000, description: 'Builder' },
			{ type: "number", value: 999000000, description: 'Singletarget' },
			{ type: "number", value: 999000000, description: 'Specialist' },
			{ type: "number", value: 999000000, description: 'Splash' },
			{ type: "number", value: 999000000, description: 'Support' },
			{ type: "number", value: 999000000, description: 'Tank' },
		];
	}

}

export default new Store();