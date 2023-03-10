import { useState } from "react";

// if uses inside useMemo/useCallback, add output to deps!
export function useUpdate(): ([boolean, () => void]) {
	let [value, setState] = useState(true);
	return [value, (): void => setState(!value)];
}

export function useForceUpdate(): ([number, () => void]) {
	let [value, setState] = useState(0);
	return [value, (): void => setState(Math.random())];
}