/* Generated with TypeScript snippets */

import { SCParam } from "./sc-param";
import { StarCode } from "./starcode";

/** SCModule **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

export class SCModule {

	protected _queue: Array<SCParam>;

	constructor() {
		this.init();
	}

	public checkData(): boolean {
		return false;
	}

	public reset(): void {
		this.init();
	}

	/** Depends on current map's logic (some of them can require hash) */
	public write(starCode: StarCode, key: string): string {
		starCode.reset();

		const length: number = this._queue.length;
		for (let i: number = 0; i < length; i++)
			starCode.setInt(this._queue[i].current, this._queue[i].max);

		/* console.log('current writed code:', starCode.currentCode);
		console.log('current compressed code:', starCode.currentCode = starCode.compress(starCode.currentCode));
		console.log('current encoded code:', starCode.currentCode = starCode.encrypt(starCode.currentCode, key));
		return starCode.currentCode; */

		//return starCode.encrypt(starCode.compress(starCode.currentCode), key);
		return starCode.compressAndEncrypt(key);
	}

	/** Depends on current map's logic (some of them can require hash) */
	public read(starCode: StarCode, key: string): void {
		//starCode.currentCode = starCode.decompress(starCode.decrypt(starCode.currentCode, key));
		starCode.decryptAndDecompress(starCode.code, key);

		let i: number = this._queue.length - 1;
		while (i >= 0) {
			//console.log(this._queue[i].description + ': ' + starCode.getInt(this._queue[i].max));
			this._queue[i].update(starCode.getInt(this._queue[i].max));
			i--;
		}
	}

	public get queue(): Array<SCParam> {
		return this._queue;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected init(): void {
		this._queue = new Array<SCParam>();
	}
}