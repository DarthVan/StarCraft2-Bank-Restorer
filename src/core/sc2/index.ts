/**
 * Full sc2 natives (interface):
 * https://github.com/grum/sc2-dev/blob/master/Mods/Core.SC2Mod/Base.SC2Data/TriggerLibs/natives.galaxy
 */

/** Galaxy Script 'a * b' */
export function sc2_mult(...args: number[]): number {
	let result: number = toFixed(args[0]);
	if (args.length == 1)
		return result;
	for (let i: number = 1; i < args.length; i++)
		result = toFixed(result * toFixed(args[i]));
	return result;
}

/** Galaxy Script 'a / b' */
export function sc2_div(a: number, b: number): number {
	return toFixed(toFixed(a) / toFixed(b));
}

/** Galaxy Script 'round(a)' */
export function sc2_round(a: number): number {
	return toFixed(Math.round(toFixed(a)));
}

/** Galaxy Script 'native fixed Pow (fixed x, fixed power)' */
export function sc2_Pow(a: number, b: number): number {
	return toFixed(Math.pow(toFixed(a), toFixed(b)));
}

/** Galaxy Script 'native int PowI (fixed x, fixed power)' */
export function sc2_PowI(a: number, b: number): number {
	return Math.floor(sc2_Pow(a, b));
}

/** Galaxy Script 'native fixed SquareRoot (fixed x)' */
export function sc2_SquareRoot(value: number): number {
	return toFixed(Math.pow(toFixed(value % 1048576), 0.5));
}

/** Galaxy Script 'native fixed ModF (fixed x, fixed m)' or 'a % b' */
export function sc2_ModF(a: number, b: number): number {
	return toFixed(toFixed(a) % toFixed(b));
}

/** Galaxy Script 'native int   ModI (int x, int m)' or 'a % b' */
export function sc2_ModI(a: number, b: number): number {
	return Math.floor(sc2_ModF(a, b));
}

// StringReplace replaces the indexed character range in the string with the replacement string
// and returns the result.
//native string   StringReplace (string s, string replace, int start, int end);

/** Galaxy Script 'StringFind'. Indexing starts from 1. c_stringCase = true, c_stringNoCase = false */
export function sc2_StringFind(s1: string, s2: string, caseSens: boolean = true): number {
	if (!caseSens) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();
	}
	//return s1.indexOf(s2);
	const index: number = s1.indexOf(s2);
	if (index == -1)
		return 0;
	return index + 1;
}

/** Galaxy Script 'StringSub'. Indexing starts from 1 */
export function sc2_StringSub(s: string, start: number, end: number): string {
	const adjustedStart: number = start - 1;
	const adjustedEnd: number = end <= 0 ? undefined : end;
	return s.substring(adjustedStart, adjustedEnd);
}

/** Galaxy Script 'native int StringLength (string s)' */
export function sc2_StringLength(s: string): number {
	return s.length;
}

/** Galaxy Script 'native string StringWord (string s, int index)' */
export function sc2_StringWord(s: string, index: number): string {
	const words: string[] = s.split(" ");
	if (index < 0 || index >= words.length) {
		throw new Error(`Invalid index: ${index}`);
	}
	return words[index];
}

/** Galaxy Script 'native string FixedToString (fixed x, int precision)' */
export function sc2_FixedToString(value: number, afterDot: number = 4): string {
	let d: number = 1;
	while (afterDot-- > 0)
		d *= 10;
	return (Math.floor(value * d + 0.1) / d).toString();
}

/** Creates zero array with any dimensions, like 'byte[5][5]' */
export function sc2_initZeroArray<T>(...args: number[]): T {
	if (!args.length) {
		return null;
	}

	const createArray = (dimensions: number[]): any => {
		const size: number = dimensions[0];
		const newArray: any[] = Array(size).fill(0);

		if (dimensions.length > 1)
			for (let i: number = 0; i < size; i++)
				newArray[i] = createArray(dimensions.slice(1));

		return newArray;
	};

	return createArray(args) as T;
}

Array.from({ length: 5 }, () => Array(5).fill(0));

function toFixed(value: number): number {
	return frac(value, 4096);
}

function frac(value: number, size: number = 4096): number {
	return Math.floor(value * size) / size;
}



// js tests
/*

console.log('1: 508837005 => 0.5075;', sc2_toString(sc2_divide(sc2_sqrt(508837005), 1038)));
console.log('2: 200386659 => 0.3173;', sc2_toString(sc2_divide(sc2_sqrt(200386659), 1038)));
console.log('3: 14034252 => 0.6113;', sc2_toString(sc2_divide(sc2_sqrt(14034252), 1038)));
console.log('4: 900000 => 0.9139;', sc2_toString(sc2_divide(sc2_sqrt(900000), 1038)));

console.log('5: 13128980 => 0.7077;', sc2_toString(sc2_divide(sc2_sqrt(13128980), 1044)));
console.log('6: 77809327 => 0.4436;', sc2_toString(sc2_divide(sc2_sqrt(77809327), 1044)));

console.log('7: 247 => 0.015;', sc2_toString(sc2_divide(sc2_sqrt(247), 1043 + 2)));
console.log('8: 8 => 0.0263;', sc2_toString(sc2_divide(sc2_sqrt(8), 104 + 3.25)));

console.log('9: 1113 => 0.0317;', sc2_toString(sc2_divide(sc2_sqrt(1113), 1043 + 2)));




function frac(x, den) {
	num = Math.floor(x * den)
	return num / den;
}

function to_fixed(x) {
	return frac(x, 4096);
}

function sc2_sqrt(x) {
	x = x % 1048576;
	return to_fixed(Math.pow(to_fixed(x), 0.5));
}

function sc2_divide(a, b) {
	return to_fixed(a / b);
}

function sc2_toString(fixed, afterDot = 4) {
	let d = 1;
	while(afterDot-- > 0)
		d *= 10;
	return Math.floor(fixed * d + 0.1) / d;
}

*/