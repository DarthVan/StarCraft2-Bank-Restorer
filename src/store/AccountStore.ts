/* Generated with TypeScript snippets */

import { dateID } from "src/utils/utils";
import { BasicStore } from "./BasicStore";

/** AccountStore **
* ...
* @Author Star Noob
* @Created 2023-01-16
*/

export class AccountStore extends BasicStore {

	public list: { id: string, name: string, playerID: string }[];
	public current: string;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override reset(): void {
		this.list = [{ id: 'DEFAULT', name: 'Noob', playerID: '' }];
		this.current = 'DEFAULT';
		localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	}

	public add(name: string = '', playerID: string = ''): { id: string, name: string, playerID: string } {
		const account: { id: string, name: string, playerID: string } = { id: dateID(), name, playerID };
		this.list = [...this.list, account];
		localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
		return account;
	}

	public change(id: string, params: { name?: string, playerID?: string }): void {
		for (let i: number = 0; i < this.list.length; i++) {
			const account: { id: string, name: string, playerID: string } = this.list[i];
			if (account.id == id) {
				if (params.name)
					account.name = params.name;
				if (params.playerID)
					account.playerID = params.playerID;
				break;
			}
		}
		this.list = [...this.list];
		localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	}

	public remove(id: string): void {
		if (this.list.length <= 1)
			return;
		this.list = this.list.filter((account: { id: string }): boolean => account.id != id);
		if (this.current == id) // если удаляем активную учетку, то переключаемся на первую в списке
			this.current = this.list[0].id;
		localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	}

	public setSelected(value: string): void {
		this.current = value;
		localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	}

	public get currentAccount(): { id: string, name: string, playerID: string } {
		for (let i: number = 0; i < this.list.length; i++)
			if (this.list[i].id == this.current)
				return this.list[i];
		return null;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		const json: any = JSON.parse(localStorage.getItem("AccountData"));
		this.list = json?.list;
		if (!this.list || !this.list.length)
			this.reset();
		this.current = json?.selected;
		if (!this.current)
			this.setSelected(this.list[0].id);
	}

}