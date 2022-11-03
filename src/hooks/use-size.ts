import { useEffect, useState } from 'react';

export default function useWindowSize(callback: (width: number, height: number) => void): void {
	if (!callback)
		return;

	const getWidth: () => number = (): number => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	const getHeight: () => number = (): number => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	// save current window width in the state object
	const [size, setSize] = useState({ width: getWidth(), height: getHeight() });

	// in this case useEffect will execute only once because
	// it does not have any dependencies.
	useEffect((): (() => void) => {
		// timeoutId for debounce mechanism
		let timeoutId: number = null;
		const resizeListener: () => void = (): void => {
			// prevent execution of previous setTimeout
			clearTimeout(timeoutId);
			// change width from the state object after 150 milliseconds
			timeoutId = setTimeout((): void => setSize({ width: getWidth(), height: getHeight() }), 500);
		};
		// set resize listener
		window.addEventListener('resize', resizeListener);

		// clean up function
		return (): void => {
			// remove resize listener
			window.removeEventListener('resize', resizeListener);
			clearTimeout(timeoutId);
		}
	}, []);

	callback(size.width, size.height);
}
