// random value from min...max
export function r(min: number, max: number): number {
	return Math.round(Math.random() * (max - min)) + min;
}

// time to number
export function t2n(value: string = '00:10:00'): number {
	const a: string[] = value.split(':');
	return parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
}

// number to time
export function n2t(value: number): string {
	return new Date(1000 * value).toISOString().substring(11, 19);
}