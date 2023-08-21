/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';

/** MenuStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export default class MenuStore {

	public playerID: string = '';
	public selectedMap: number = 0;
	public autoSave: boolean = true;
	public sounds: boolean = true;

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	public reset(): void {
		localStorage.removeItem('PlayerID');
		this.playerID = '';

		localStorage.removeItem('SelectedMap');
		this.selectedMap = 0;

		localStorage.removeItem('AutoSave');
		this.autoSave = true;

		localStorage.removeItem('Sounds');
		this.sounds = true;
	}

	public setPlayerID(value: string): void {
		this.playerID = value;
		localStorage.setItem('PlayerID', value);
	}

	public setSelectedMap(value: number): void {
		//console.log('set selected map:', value.toString());
		this.selectedMap = value;
		localStorage.setItem('SelectedMap', value.toString());
	}

	public setAutoSave(value: boolean): void {
		this.autoSave = value;
		localStorage.setItem('AutoSave', value ? 'true' : 'false');
	}

	public setSounds(value: boolean): void {
		this.sounds = value;
		localStorage.setItem('Sounds', value ? 'true' : 'false');
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {

		this.playerID = localStorage.getItem('PlayerID') || '';
		this.selectedMap = parseInt(localStorage.getItem('SelectedMap')) || 0;

		// Enabled by default
		this.autoSave = localStorage.getItem('AutoSave') == 'false' ? false : true;
		this.sounds = localStorage.getItem('Sounds') == 'false' ? false : true;

	}
}