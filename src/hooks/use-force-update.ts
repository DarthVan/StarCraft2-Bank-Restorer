import { useState } from "react";

export function useForceUpdate(): (() => void) {
	let [value, setState] = useState(0);
	return (): void => setState(Math.random());
}