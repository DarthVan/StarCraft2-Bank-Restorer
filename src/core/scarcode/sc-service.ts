/* Generated with TypeScript snippets */

import { SCParam } from "./sc-param";
import starcode from "./starcode";

/** SCService **
* ...
* @Author Star Noob
* @Created 2023-02-10
*/

class SCService {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	/** Depends on current map's logic (some of them can require hash) */
	public write(queue: SCParam[], key: string, options?: { compress?: boolean, hash?: number, encrypt?: boolean }): string {
		starcode.reset();

		const length: number = queue.length;
		for (let i: number = 0; i < length; i++)
			starcode.setInt(queue[i].current, queue[i].max);

		if (options) {
			options.compress ? starcode.code = starcode.compress(starcode.code) : starcode.code;
			options.hash ? starcode.code = starcode.addHash(starcode.code, options.hash) : starcode.code;
			options.encrypt ? starcode.code = starcode.encrypt(starcode.code, key) : starcode.code;
		} else
			starcode.compressAndEncrypt(key);

		return starcode.code;
	}

	/** Depends on current map's logic (some of them can require hash) */
	public read(code: string, queue: SCParam[], key: string, options?: { decrypt?: boolean, dehash?: number, decompress?: boolean }): void {
		starcode.code = code;

		if (options) {
			options.decrypt ? starcode.code = starcode.decrypt(starcode.code, key) : starcode.code;
			options.dehash ? starcode.code = starcode.removeHash(starcode.code, options.dehash) : starcode.code;
			options.decompress ? starcode.code = starcode.decompress(starcode.code) : starcode.code;
		} else
			starcode.decryptAndDecompress(starcode.code, key);

		let i: number = queue.length - 1;
		while (i >= 0) {
			//console.log(queue[i].description + ': ' + starcode.getInt(queue[i].max));
			queue[i].update(starcode.getInt(queue[i].max));
			i--;
		}
	}

}

export default new SCService();