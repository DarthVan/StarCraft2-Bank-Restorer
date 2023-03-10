/* Generated with TypeScript snippets */

import { BasicStore } from "src/store/BasicStore";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-05
*/

class Store extends BasicStore {

	public active: boolean;
	public hide: boolean;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: { active?: boolean, hide?: boolean }): void {
		this.active = fields?.active ? fields.active : false;
		this.hide = fields?.hide ? fields.hide : false;
	}

	public updateAt(field: 'active' | 'hide', value: boolean): void {
		this[field] = value;
	}

	public override reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.active = false;
		this.hide = false;
	}

}

export default new Store();