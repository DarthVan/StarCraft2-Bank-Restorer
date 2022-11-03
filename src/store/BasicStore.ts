/* Generated with TypeScript snippets */

import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

/** BasicStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export class BasicStore {

	constructor() {
		this.init();
		/* makeObservable(this, {
			propertyA: observable,
			methodA: action,
		}); */
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public reset(): void {

	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected init(): void {

	}

}