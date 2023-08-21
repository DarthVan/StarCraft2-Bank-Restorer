/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';

/** ModalStore **
* ...
* @Author Star Noob
* @Created 2022-11-09
*/

export enum Modals {

	NONE,
	HELP,
	WARN,
	CONFIRM,
	ACCOUNTS,
	UPDATES

}

export default class ModalStore {

	public current: number;
	public message: string;
	public actions: (() => void)[];
	public data: any;

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setModal(id: keyof typeof Modals, message?: string, actions?: (() => void)[], data?: any): void {
		this.current = Modals[id];
		this.message = message;
		if (id == 'NONE') {
			this.actions = []; // на всякий случай сразу потрем их
			this.data = null;
			return;
		}
		this.actions = actions;
		this.data = data;
	}

	public reset(): void {
		this.current = 0;
		localStorage.removeItem('FirstHelp');
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {
		if (localStorage.getItem('FirstHelp') == 'true') {
			this.current = Modals.NONE;
			return;
		}
		this.current = Modals.HELP;
		localStorage.setItem('FirstHelp', 'true');
	}

}