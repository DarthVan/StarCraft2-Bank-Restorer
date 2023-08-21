/* Generated with TypeScript snippets */

import { makeAutoObservable } from 'mobx';

/** MapStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export default class MapStore {

	public list: any;

	constructor() {
		this.init();
		makeAutoObservable(this);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public reset(): void {
		this.list = {};
		localStorage.removeItem('MapsData');
	}

	public setMapData(accountID: string, mapID: string, data: {}): void {
		this.list[accountID] = { ...this.list[accountID], [mapID]: data };
		localStorage.setItem('MapsData', JSON.stringify(this.list));
	}

	public clearMapData(accountID: string, mapID?: string): void {
		if (mapID) {
			if (!this.list[accountID]?.[mapID])
				return;
			this.list[accountID][mapID] = null;
			delete (this.list[accountID][mapID]);
		} else { // удаляем все банки учетки
			this.list[accountID] = null;
			delete (this.list[accountID]);
		}
		localStorage.setItem('MapsData', JSON.stringify(this.list));
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	private init(): void {
		this.list = JSON.parse(localStorage.getItem('MapsData')) || {};
	}

}