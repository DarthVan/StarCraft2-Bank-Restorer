/* Generated with TypeScript snippets */

import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { BasicStore } from './BasicStore';

/** MenuStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export class MenuStore extends BasicStore {

	public playerID: string;
	public selectedMap: number;

	public override reset(): void {
		localStorage.removeItem("PlayerID");
		this.playerID = '';

		this.selectedMap = 0;
	}

	public setPlayerID(value: string): void {
		this.playerID = value;
		localStorage.setItem("PlayerID", value);
	}

	public setSelectedMap(value: number): void {
		console.log('set selected map:', value.toString());
		this.selectedMap = value;
		localStorage.setItem("SelectedMap", value.toString());
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {

		this.playerID = localStorage.getItem("PlayerID") || '';
		this.selectedMap = parseInt(localStorage.getItem("SelectedMap")) || 0;

	}
}