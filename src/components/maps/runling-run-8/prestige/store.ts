/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-05
*/

class Store {

	public active: boolean;
	public hide: boolean;

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: { active?: boolean, hide?: boolean }): void {
		this.active = fields?.active ? fields.active : false;
		this.hide = fields?.hide ? fields.hide : false;
	}

	public updateAt(field: 'active' | 'hide', value: boolean): void {
		this[field] = value;
	}

	public reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {
		this.active = false;
		this.hide = false;
	}

}

export default new Store();