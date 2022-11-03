export default function modyfyNumericInputs(): void {
	console.log('searching inputs...');

	const intRx: RegExp = /\d/;
	const integerChange: (e: any) => void = (e: any): void => {
		console.log(e.key);
		if ((e.key.length > 1) || e.ctrlKey || ((e.key === "-") && (!e.currentTarget.value.length)) || intRx.test(e.key))
			return;
		e.preventDefault();
	};

	for (const input of document.querySelectorAll('input[type="number"][step="1"]')) {
		console.log(input, ' has been modified!');
		input.addEventListener("keydown", integerChange);
	}
}