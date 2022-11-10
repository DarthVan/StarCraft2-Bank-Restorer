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
	CONFIRM

}

export class ModalStore extends BasicStore {

	public current: number;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setModal(id: Modals): void {
		this.current = id;
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