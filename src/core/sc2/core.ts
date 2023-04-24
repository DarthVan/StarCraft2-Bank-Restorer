/** Galaxy Script 'Pow(a, b)' */
export function sc2_pow(a: number, b: number): number {
	return toFixed(Math.pow(a, b));
}

/** Galaxy Script 'SquareRoot(x)' */
export function sc2_sqrt(value: number): number {
	return toFixed(Math.pow(toFixed(value % 1048576), 0.5));
}

/** Galaxy Script 'a / b' */
export function sc2_div(a: number, b: number): number {
	return toFixed(a / b);
}

/** Galaxy Script 'fixedToString(x, digitsAfterDot = 4)' */
export function sc2_fstr(value: number, afterDot: number = 4): string {
	let d: number = 1;
	while (afterDot-- > 0)
		d *= 10;
	return (Math.floor(value * d + 0.1) / d).toString();
}

function frac(value: number, size: number = 4096): number {
	return Math.floor(value * size) / size;
}

function toFixed(value: number): number {
	return frac(value, 4096);
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