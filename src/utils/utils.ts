import filesaver from "file-saver";

/** random value from min...max */
export function r(min: number, max: number): number {
	return Math.round(Math.random() * (max - min)) + min;
}

/** time to number */
export function t2n(value: string = '00:10:00'): number {
	const a: string[] = value.split(':');
	return parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
}

/** number to time */
export function n2t(value: number): string {
	return new Date(1000 * value).toISOString().substring(11, 19);
}

/** generates id by time and compress it to string32 */
export function dateID(removeSymbols: number = 2): string {
	return (Date.now() + Math.random()).toString(32).replace('.', '').substring(removeSymbols).toUpperCase();
}

/* export function counter(): number {
	return counter.value ? ++counter.value : counter.value = 1;
} */

/** copy text to clipboart */
export function copyTextToClipboard(data: string, log?: boolean): void {
	window.navigator['clipboard'].writeText(data).then((): void => {
		if (log)
			console.log('Copied to clipboard:\n', data);
	});
}

/** download text as file */
export function downloadTextAsFile(data: string, fileName: string, log?: boolean): void {
	const blob = new Blob([data], { type: 'application/octet-stream' });
	filesaver.saveAs(blob, fileName);
	if (log)
		console.log('download bank file:', data);
}