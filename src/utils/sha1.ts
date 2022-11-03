// SHA1 Crypto utily

const POW_2_24: number = Math.pow(2, 24);
const POW_2_32: number = Math.pow(2, 32);

function hex(n: number): string {
	let s: string = "";
	for (let i: number = 7; i >= 0; --i) {
		const v: number = (n >>> (i << 2)) & 0xF;
		s += v.toString(16);
	}
	return s;
}

function lrot(n: number, bits: number): number {
	return ((n << bits) | (n >>> (32 - bits)));
}

class Uint32ArrayBigEndian {
	bytes: Uint8Array;
	constructor(length: number) {
		this.bytes = new Uint8Array(length << 2);
	}
	get(index: number): number {
		index <<= 2;
		return (this.bytes[index] * POW_2_24)
			+ ((this.bytes[index + 1] << 16)
				| (this.bytes[index + 2] << 8)
				| this.bytes[index + 3]);
	}
	set(index: number, value: number): void {
		const high: number = Math.floor(value / POW_2_24);
		const rest: number = value - (high * POW_2_24);
		index <<= 2;
		this.bytes[index] = high;
		this.bytes[index + 1] = rest >> 16;
		this.bytes[index + 2] = (rest >> 8) & 0xFF;
		this.bytes[index + 3] = rest & 0xFF;
	}
}

function string2ArrayBuffer(s: string): ArrayBuffer {
	s = s.replace(/[\u0080-\u07ff]/g,
		function (c: string): string {
			const code: number = c.charCodeAt(0);
			return String.fromCharCode(0xC0 | code >> 6, 0x80 | code & 0x3F);
		});
	s = s.replace(/[\u0080-\uffff]/g,
		function (c: string): string {
			const code: number = c.charCodeAt(0);
			return String.fromCharCode(0xE0 | code >> 12, 0x80 | code >> 6 & 0x3F, 0x80 | code & 0x3F);
		});
	const n: number = s.length;
	const array = new Uint8Array(n);
	for (let i: number = 0; i < n; ++i)
		array[i] = s.charCodeAt(i);
	return array.buffer;
}

export function hashSHA1(bufferOrString: any): string {
	let source: ArrayBuffer;
	if (bufferOrString instanceof ArrayBuffer)
		source = <ArrayBuffer>bufferOrString;
	else
		source = string2ArrayBuffer(String(bufferOrString));

	const sbytes: number = source.byteLength;
	const sbits: number = sbytes << 3;
	const minbits: number = sbits + 65;
	const bits: number = Math.ceil(minbits / 512) << 9;
	const bytes: number = bits >>> 3;
	const slen: number = bytes >>> 2;
	const s = new Uint32ArrayBigEndian(slen);
	const s8: Uint8Array = s.bytes;
	const w: Uint32Array = new Uint32Array(80);
	const sourceArray: Uint8Array = new Uint8Array(source);

	let h0: number = 0x67452301;
	let h1: number = 0xEFCDAB89;
	let h2: number = 0x98BADCFE;
	let h3: number = 0x10325476;
	let h4: number = 0xC3D2E1F0;
	let i: number;
	let j: number;

	for (i = 0; i < sbytes; ++i)
		s8[i] = sourceArray[i];

	s8[sbytes] = 0x80;
	s.set(slen - 2, Math.floor(sbits / POW_2_32));
	s.set(slen - 1, sbits & 0xFFFFFFFF);
	for (i = 0; i < slen; i += 16) {
		for (j = 0; j < 16; ++j)
			w[j] = s.get(i + j);

		for (; j < 80; ++j)
			w[j] = lrot(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

		let a: number = h0;
		let b: number = h1;
		let c: number = h2;
		let d: number = h3;
		let e: number = h4;
		let f: number;
		let k: number;
		let temp: number;
		for (j = 0; j < 80; ++j) {
			if (j < 20) {
				f = (b & c) | ((~b) & d);
				k = 0x5A827999;
			}
			else if (j < 40) {
				f = b ^ c ^ d;
				k = 0x6ED9EBA1;
			}
			else if (j < 60) {
				f = (b & c) ^ (b & d) ^ (c & d);
				k = 0x8F1BBCDC;
			}
			else {
				f = b ^ c ^ d;
				k = 0xCA62C1D6;
			}

			temp = (lrot(a, 5) + f + e + k + w[j]) & 0xFFFFFFFF;
			e = d;
			d = c;
			c = lrot(b, 30);
			b = a;
			a = temp;
		}
		h0 = (h0 + a) & 0xFFFFFFFF;
		h1 = (h1 + b) & 0xFFFFFFFF;
		h2 = (h2 + c) & 0xFFFFFFFF;
		h3 = (h3 + d) & 0xFFFFFFFF;
		h4 = (h4 + e) & 0xFFFFFFFF;
	}
	return hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4);
}