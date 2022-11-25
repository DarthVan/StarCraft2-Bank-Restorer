/* Generated with TypeScript snippets */

/** StarCode **
* ported from v 1.5 + some improvements
* @Author Star Noob
* @Created 2022-09-24
*/

export class StarCode {

	public code: string;

	private readonly ALPHABET: string;
	private readonly ALENGTH: number;
	private readonly AMAP: Map<string, number>;

	constructor() {
		this.ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$%/()=?,.-;:_^#+* @{[]}|~`';
		this.ALENGTH = this.ALPHABET.length;
		this.AMAP = new Map<string, number>();
		for (let i: number = 0; i < this.ALENGTH; i++)
			this.AMAP.set(this.ALPHABET.charAt(i), i);
		this.reset();
		console.log('starcode initialized.');
	}

	/** Encrypt string value by key */
	public encrypt(s: string, key: string): string {
		const ls: number = s.length;
		const lk: number = key.length;
		let out: string = '';
		for (let i: number = 0; i < ls; i++)
			out += this.shift(s.charAt(i), key.charAt(i % lk), true);
		return out;
	}

	/** Decrypt string value by key */
	public decrypt(s: string, key: string): string {
		const ls: number = s.length;
		const lk: number = key.length;
		let out: string = '';
		for (let i: number = 0; i < ls; i++)
			out += this.shift(s.charAt(i), key.charAt(i % lk), false);
		return out;
	}

	/** Base10ToN - compress string value */
	public compress(s: string): string {
		const n: string = this.ALENGTH.toString();
		let out: string = '';
		while (s != '0') {
			out = this.chr(parseInt(this.modulo(s, n))) + out;
			s = this.divide(s, n);
		}
		return out;
	}

	/** BaseNTo10 - decompress string value */
	public decompress(s: string): string {
		const n: string = this.ALENGTH.toString();
		const sl: number = s.length;
		let out: string = '0';
		for (let i: number = 0; i < sl; i++)
			out = this.add(out, this.multiply(this.power(n, sl - (i + 1)), this.ord(s.charAt(i)).toString()));
		return out;
	}

	/** Get value by max from current code */
	public getInt(maxValue: number): number {
		const value: number = parseInt(this.modulo(this.code, (maxValue + 1).toString()));
		this.code = this.divide(this.code, (maxValue + 1).toString());
		return value;
	}

	/** Set value and its max to current code */
	public setInt(value: number, maxValue: number): void {
		if (value > maxValue)
			throw new Error('STARCODE: value must be less or equal to maxValue!');
		this.code = this.add(this.multiply(this.code, (maxValue + 1).toString()), value.toString());
	}

	/** Add hash to string value (first n symbols before value) */
	public addHash(s: string, n: number): string {
		return this.hash(s, n) + s;
	}

	/** Remove hash from string value (removes first n symbols from value) */
	public removeHash(s: string, n: number): string {
		return s.substring(n);
	}

	/** Validate string value (useTest to detect SC2 FixedToInt max number) */
	public validate(s: string, level: number, useTest: boolean = false): boolean {
		const test: string = useTest ? s.substring(0, level) : null;
		return this.hash(s.substring(level), level, test) == s.substring(0, level);
	}

	/** Reset current code */
	public reset(): void {
		this.code = '0';
	}

	/** Shortcut for compress and encrypt current code */
	public compressAndEncrypt(key: string): string {
		return this.code = this.encrypt(this.compress(this.code), key);
	}

	/** Shortcut for decrypt and decompress current code */
	public decryptAndDecompress(s: string, key: string): string {
		return this.code = this.decompress(this.decrypt(s, key));
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private add(a: string, b: string): string {
		b.length > a.length ? a = this.fill(a, b.length) : b = this.fill(b, a.length);
		let carry: number = 0;
		let out: string = '';
		for (let i: number = a.length - 1; i >= 0; i--) {
			const c: number = parseInt(a.charAt(i)) + parseInt(b.charAt(i));
			out = ((c + carry) % 10).toString() + out;
			carry = Math.floor((c + carry) / 10);
		}
		return carry ? carry.toString() + out : out;
	}

	private subtract(a: string, b: string): string {
		b.length > a.length ? a = this.fill(a, b.length) : b = this.fill(b, a.length);
		let out: string = '';
		let carry: number = 0;
		for (let i: number = a.length - 1; i >= 0; i--) {
			let c: number = parseInt(a.charAt(i)) - parseInt(b.charAt(i)) - carry;
			if (c < 0) {
				carry = 1;
				c += 10;
			} else
				carry = 0;
			out = c.toString() + out;
		}
		return this.cut(out);
	}

	private multiply(a: string, b: string): string {
		if (b == '0')
			return '0';
		const m: number = parseInt(b);
		let carry: number = 0;
		let out: string = '';
		for (let i: number = a.length - 1; i >= 0; i--) {
			const c: number = parseInt(a.charAt(i)) * m + carry;
			out = (c % 10).toString() + out;
			carry = Math.floor(c / 10);
		}
		if (carry > 0)
			out = carry.toString() + out;
		return out;
	}

	private divide(a: string, b: string): string {
		const d: number = parseInt(b);
		const la: number = a.length;
		let carry: number = 0;
		let out: string = '';
		for (let i: number = 0; i < la; i++) {
			const c: number = (parseInt(a.charAt(i))) + carry * 10;
			out += Math.floor(c / d).toString(); // need floor?
			carry = c % d;
		}
		return this.cut(out);
	}

	private modulo(a: string, b: string): string {
		const d: number = parseInt(b);
		const la: number = a.length;
		let carry: number = 0;
		for (let i: number = 0; i < la; i++)
			carry = (parseInt(a.charAt(i)) + carry * 10) % d;
		return carry.toString();
	}

	private cut(s: string): string {
		const n: number = s.length - 1;
		let i: number = 0;
		while (i < n && s.charAt(i) == '0')
			i++;
		return s.substring(i);
	}

	private power(a: string, pow: number): string {
		if (pow <= 0)
			return '1';
		let out: string = a;
		while (pow > 1) {
			out = this.multiply(out, a);
			pow--;
		}
		return out;
	}

	private chr(i: number): string {
		return this.ALPHABET.charAt(i);
	}

	private ord(i: string): number {
		return this.AMAP.get(i); // faster solution via presetted map
	}

	private shift(s: string, k: string, forward: boolean = true): string {
		if (forward)
			return this.chr((this.ord(s) + this.ord(k)) % this.ALENGTH);
		const c: number = this.ord(s) - this.ord(k);
		if (c < 0)
			return this.chr((c + this.ALENGTH) % this.ALENGTH);
		return this.chr(c % this.ALENGTH);
	}

	private fill(s: string, i: number): string {
		i -= s.length;
		let t: string = '';
		while (i > 0) {
			t += '0';
			i--;
		}
		return t + s;
	}

	private hash(s: string, v: number, test?: string): string {
		let out: string = '0';
		for (let i: number = s.length - 1; i >= 0; i--)
			out = this.add(out, (this.ord(s.charAt(i)) * (i + 1)).toString());

		if (!test)
			return this.fill(this.compress(this.modulo(out, this.int(Math.pow(this.ALENGTH, v)).toString())), v);

		// test block
		let max: number = 172319;
		const nextTest: (origin: string) => void = (origin: string): void => {
			max++;
			let pow: number = Math.pow(this.ALENGTH, v);
			pow = pow > max ? pow = max : pow;
			const hash: string = this.fill(this.compress(this.modulo(out, pow.toString())), v);
			if (max % 1000 == 0)
				console.log('max:', max, '; hash:', hash, '; origin:', origin);
			if (hash != origin)
				setTimeout(test, 5, out, v);
			else
				console.log('max found!:', max, '; hash:', hash, '; origin:', origin);
		}
		nextTest(test);

		return 'test';
	}

	// SC2 FixedToInt solution
	private int(n: number): number {
		const sc2FixedMax: number = 172319;
		if (n > sc2FixedMax)
			return sc2FixedMax;
		return Math.floor(n);
	}

}

export default new StarCode();