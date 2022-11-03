/* Generated with TypeScript snippets */

import { BasicStore } from "./BasicStore";

/** MapStore **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export class MapStore extends BasicStore {

	list: any;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override reset(): void {
		this.list = {};
	}

	public setMapData(id: string, data: {}): void {
		this.list[id] = data;
		localStorage.setItem("MapsData", JSON.stringify(this.list));
	}

	public clearMapData(id: string): void {
		if (!this.list[id])
			return;
		this.list[id] = null;
		delete (this.list[id]);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.list = JSON.parse(localStorage.getItem("MapsData")) || {};
	}

}