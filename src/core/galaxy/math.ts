/** Galaxy Script 'SquareRoot' simulation */
export function gsSqrt(value: number): number {
	//return Math.floor(Math.sqrt(value) * 100) / 100;

	let a: number = Math.pow(Math.floor(value * 4096) / 4096, 0.5);
	return Math.floor(a * 4096) / 4096;
}

/** Galaxy Script 'Pow' simulation */
export function gsPow(a: number, b: number): number {
	return Math.floor(Math.pow(a, b) * 100) / 100;
}

/** Galaxy Script 'divide' simulation */
export function gsDivide(a: number, b: number): number {
	return Math.floor((a / b) * 10000) / 10000;
}

// TODO: add limits check