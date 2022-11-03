/* Generated with TypeScript snippets */

/** StarCode **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

export class StarCode {

	private _currentCode: string;
	private _map: Map<string, number>;

	private readonly ALPHABET: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$%/()=?,.-;:_^#+* @{[]}|~`';
	private readonly ZERO_CODE: number = 48;

	constructor() {
		this.init();
	}

	public get currentCode(): string {
		return this._currentCode;
	}

	public set currentCode(value: string) {
		this._currentCode = value;
	}

	public encrypt(s: string, key: string): string {
		let result: string = '';
		const length: number = s.length;
		for (let i: number = 0; i < length; i++) {
			const key_index: number = i % key.length;
			result += this.shift(s.charAt(i), key.charAt(key_index), true);
		}
		return result;
	}

	public decrypt(s: string, key: string): string {
		let result: string = '';
		const length: number = s.length;
		for (let i: number = 0; i < length; i++) {
			const key_index: number = i % key.length;
			result += this.shift(s.charAt(i), key.charAt(key_index), false);
		}
		return result;
	}

	public compress(s: string): string { // 10 to N
		if (s == '')
			return s;
		const base: string = this.ALPHABET.length.toString();
		let result: string = '';
		while (s != '0') {
			const remainder: string = this.modulo(s, base);
			result = this.ALPHABET.charAt(parseInt(remainder)) + result;
			s = this.divide(s, base);
		}
		return result;
	}

	public decompress(s: string): string { // N to 10
		const base: string = this.ALPHABET.length.toString();
		let power: string = '1';
		let result: string = '0';
		let i: number = s.length - 1;
		while (i >= 0) {
			const index: number = this._map.get(s.charAt(i));
			const digit_value: string = this.multiply(power, index.toString());
			result = this.add(result, digit_value);
			power = this.multiply(power, base);
			i--;
		}
		return result;
	}

	public getInt(maxValue: number): number {
		const value: number = this.decodenumber(this._currentCode, maxValue + 1);
		this._currentCode = this.decodestring(this._currentCode, maxValue + 1);
		return value;
	}

	public setInt(value: number, maxValue: number): void {
		if (value <= maxValue)
			this._currentCode = this.encodenumber(this._currentCode, value, maxValue + 1);
	}

	public addHash(s: string, level: number): string {
		return this.hash(s, level) + s;
	}

	public removeHash(s: string, level: number): string {
		return s.substring(level, level + s.length);
	}

	public validate(s: string, level: number): boolean {
		return this.hash(s.substring(level, level + s.length), level) == s.substring(0, level);
	}

	public reset(): void {
		this._currentCode = '0';
	}

	public compressAndEncrypt(key: string): string {
		return this._currentCode = this.encrypt(this.compress(this._currentCode), key);
	}

	public decryptAndDecompress(s: string, key: string): string {
		return this._currentCode = this.decompress(this.decrypt(s, key));
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private init(): void {
		this._currentCode = '0';
		this._map = new Map<string, number>();

		const length: number = this.ALPHABET.length;
		for (let i: number = 0; i < length; i++)
			this._map.set(this.ALPHABET.charAt(i), i);
	}

	private encodenumber(s: string, value: number, maxValue: number): string {
		return this.add(this.multiply(s, maxValue.toString()), value.toString());
	}

	private decodenumber(s: string, max: number): number {
		return parseInt(this.modulo(s, max.toString())); // float? int?
	}

	private decodestring(s: string, max: number): string {
		return this.divide(s, max.toString());
	}

	private add(a: string, b: string): string {
		let len_a: number = a.length;
		let len_b: number = b.length;
		if (len_a < len_b) {
			a = this.fill(a, len_b);
			len_a = len_b;
		} else { //if (len_b < len_a)
			b = this.fill(b, len_a);
			len_b = len_a;
		}
		let carry: number = 0;
		let result: string = this.fillWithSymbol('0', len_a);
		let i: number = len_a - 1;
		while (i >= 0) {
			const digit_a: number = a.charCodeAt(i) - this.ZERO_CODE;
			const digit_b: number = b.charCodeAt(i) - this.ZERO_CODE;
			const sum: number = digit_a + digit_b + carry;
			const digit_result: number = sum % 10;
			carry = Math.floor(sum / 10); // Math.round? ceil? floor?
			result = this.replaceCharAt(result, i, String.fromCharCode(this.ZERO_CODE + digit_result));
			i--;
		}
		if (carry > 0)
			result = String.fromCharCode(this.ZERO_CODE + carry) + result;
		return result;
	}

	private multiply(a: string, b: string): string {
		const len_a: number = a.length;
		const number_b: number = parseFloat(b);
		if (number_b == 0)
			return '0';
		let carry: number = 0;
		let result: string = '';
		let i: number = len_a - 1;
		while (i >= 0) {
			const digit_a: number = a.charCodeAt(i) - this.ZERO_CODE;
			const tmp: number = digit_a * number_b + carry;
			result = String.fromCharCode(this.ZERO_CODE + (tmp % 10)) + result;
			carry = Math.floor(tmp / 10); // round / floor/ ceil ?
			i--;
		}
		if (carry > 0)
			result = carry.toString() + result;
		return result;
	}

	private divide(a: string, b: string): string {
		const len_a: number = a.length;
		const number_b: number = parseFloat(b);
		if (number_b == 0)
			return '0';
		let carry: number = 0;
		let result: string = '';
		for (let i: number = 0; i < len_a; i++) {
			const digit_a: number = a.charCodeAt(i) - this.ZERO_CODE;
			const dividend: number = digit_a + 10 * carry;
			const quotient: number = Math.floor(dividend / number_b); // round / floor / ceil ?
			result += quotient.toString();
			carry = dividend % number_b;
		}
		return this.cut(result);
	}

	private modulo(a: string, b: string): string {
		const len_a: number = a.length;
		const number_b: number = parseFloat(b);
		if (number_b == 0)
			return '0';
		let carry: number = 0;
		for (let i: number = 0; i < len_a; i++) {
			const digit_a: number = a.charCodeAt(i) - this.ZERO_CODE;
			const dividend: number = digit_a + 10 * carry;
			carry = dividend % number_b;
		}
		return carry.toString();
	}

	private cut(s: string): string {
		let start: number = 0;
		while ((start + 1 < s.length) && (s.charAt(start) == '0'))
			start++;
		return s.substring(start);
	}

	private power(s: string, power: number): string {
		if (power == 0)
			return '1';
		let result: string = s;
		while (power > 1) {
			result = this.multiply(result, s);
			power--;
		}
		return result;
	}

	private shift(a: string, b: string, forward: boolean = true): string {
		const index1: number = this._map.get(a);
		const index2: number = this._map.get(b);
		let result_index: number;
		if (forward)
			result_index = (index1 + index2) % this.ALPHABET.length;
		else
			result_index = (index1 - index2 + this.ALPHABET.length) % this.ALPHABET.length;
		return this.ALPHABET.charAt(result_index);
	}

	private fill(s: string, i: number): string {
		if (s.length >= i)
			return s;
		let n: number = i - s.length;
		return this.fillWithSymbol('0', n) + s;
	}

	private fillWithSymbol(s: string, n: number): string {
		let result: string = '';
		for (let i: number = 0; i < n; i++)
			result += s;
		return result;
	}

	private replaceCharAt(s: string, index: number, value: string): string {
		const before: string = s.substring(0, index);
		const after: string = s.substring(index + 1);
		return before + value + after;
	}

	private hash(s: string, length: number): string {
		let i: number = s.length - 1;
		let out: string = '0';
		while (i >= 0) {
			const index: number = this._map.get(s.charAt(i));
			out = this.add(out, (index * (i + 1)).toString());
			i--;
		}
		return this.fill(this.compress(this.modulo(out, Math.pow(this.ALPHABET.length, length).toString())), length);
	}

}

export default new StarCode();