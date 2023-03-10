/* Generated with TypeScript snippets */

/** SSFStorage **
* Starcode already has a solution for this...
* @Author Star Noob
* @Created 2022-11-13
*/

export class SSFStorage {

	public data: string = '';

	public reset(): void {
		this.data = '';
	}

	public addInt(value: number): void {
		if (value < 0)
			throw new Error('SSF Storage Error! Value negative.');

		const sv: string = value.toString();
		const sl: number = sv.length;
		this.data += sl > 9 ? '9999999999' : sl + sv; // current max is 999 999 999
	}

	public addBool(value: boolean): void {
		this.data += value ? '1' : '0';
	}

	public getInt(): number {
		if (this.data == '')
			throw new Error('SSF Storage Error! Empty data.');

		let s: string = this.data.substring(0, 1);
		const n: number = parseInt(s);
		if (n == 0 || n > this.data.length)
			throw new Error('SSF Storage Error! Wrong length: ' + n + '; use data length: 1-' + this.data.length);

		s = this.data.substring(1, n + 1);
		this.data = this.data.substring(n + 1);
		return parseInt(s);
	}

	public getBool(): boolean {
		if (this.data == '')
			throw new Error('SSF Storage Error! Empty data.');

		const s: string = this.data.substring(0, 1);
		if (s != '0' && s != '1')
			throw new Error('SSF Storage Error! Expected boolean (0 or 1).');

		this.data = this.data.substring(1);
		return s == '1' ? true : false;
	}

}

export default new SSFStorage();