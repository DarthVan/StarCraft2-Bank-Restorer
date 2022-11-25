/* Generated with TypeScript snippets */

import { BasicStore } from "./BasicStore";

/** ModalStore **
* ...
* @Author Star Noob
* @Created 2022-11-09
*/

export enum Modals {

	NONE,
	HELP,
	WARN,
	CONFIRM

}

export class ModalStore extends BasicStore {

	public current: number;
	public message: string;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setModal(id: keyof typeof Modals, message?: string): void {
		this.current = Modals[id];
		this.message = message;
	}

	public override reset(): void {
		this.current = 0;
		localStorage.removeItem("FirstHelp");
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		if (localStorage.getItem("FirstHelp") == 'true') {
			this.current = Modals.NONE;
			return;
		}
		this.current = Modals.HELP;
		localStorage.setItem("FirstHelp", 'true');
	}

}