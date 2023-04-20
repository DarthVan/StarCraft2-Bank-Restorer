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
	public autoSave: boolean;
	public sounds: boolean;

	public override reset(): void {
		localStorage.removeItem("PlayerID");
		this.playerID = '';

		localStorage.removeItem("SelectedMap");
		this.selectedMap = 0;

		localStorage.removeItem("AutoSave");
		this.autoSave = true;

		localStorage.removeItem("Sounds");
		this.sounds = true;
	}

	public setPlayerID(value: string): void {
		this.playerID = value;
		localStorage.setItem("PlayerID", value);
	}

	public setSelectedMap(value: number): void {
		//console.log('set selected map:', value.toString());
		this.selectedMap = value;
		localStorage.setItem("SelectedMap", value.toString());
	}

	public setAutoSave(value: boolean): void {
		this.autoSave = value;
		localStorage.setItem("AutoSave", value ? 'true' : 'false');
	}

	public setSounds(value: boolean): void {
		this.sounds = value;
		localStorage.setItem("Sounds", value ? 'true' : 'false');
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {

		this.playerID = localStorage.getItem("PlayerID") || '';
		this.selectedMap = parseInt(localStorage.getItem("SelectedMap")) || 0;

		// Enabled by default
		this.autoSave = localStorage.getItem("AutoSave") == 'false' ? false : true;
		this.sounds = localStorage.getItem("Sounds") == 'false' ? false : true;

	}
}