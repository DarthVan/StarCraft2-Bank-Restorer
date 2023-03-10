/* Generated with TypeScript snippets */

import { BasicStore } from "./BasicStore";

/** MapStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export class MapStore extends BasicStore {

	public list: any;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override reset(): void {
		this.list = {};
		localStorage.removeItem("MapsData");
	}

	public setMapData(accountID: string, mapID: string, data: {}): void {
		this.list[accountID] = { ...this.list[accountID], [mapID]: data };
		localStorage.setItem("MapsData", JSON.stringify(this.list));
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
		localStorage.setItem("MapsData", JSON.stringify(this.list));
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.list = JSON.parse(localStorage.getItem("MapsData")) || {};
	}

}