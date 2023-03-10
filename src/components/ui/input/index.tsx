/* Generated with TypeScript React snippets */

import React, { ChangeEvent, CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Label from '../label';
import './style.css';

/** Input **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	onChange: (value: string, index?: number, group?: string) => void;
	type?: 'text' | 'number'
	value?: string;
	min?: string;
	max?: string;
	step?: string;
	pattern?: string;
	style?: CSSProperties;
	label?: string;
	placeholder?: string;
	tip?: string;
	index?: number; // index for callback identify
	group?: string; // group for callback identify
}

const Input: FC<Props> = (props: Props): JSX.Element => {
	const ref = useRef<null | HTMLDivElement>(null);
	const type: string = props.type ? props.type : 'text';
	const pattern: string = props.pattern ? props.pattern : '^[-\d]\d*$';

	// todo: generate unique id via utils?
	const id: string = useMemo((): string => {
		return props.label ? props.label + Math.random() * 100000 : null;
	}, [props.label]);

	const [value, setValue] = useState(props.value);
	useEffect((): void => {
		setValue(props.value);
	}, [props.value]);

	const onChange: (e: ChangeEvent<HTMLInputElement>) => void = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		const value: string = type == 'text' ? e.target.value : checkOnRange(e.target.value);
		setValue(value);
		props.onChange(value, props.index, props.group);
	}, []);

	const checkOnRange: (value: string) => string = (value: string): string => {
		let intValue: number = value ? parseInt(value) : 0;
		const minInt: number = props.min ? parseInt(props.min) : 0;
		const maxInt: number = props.max ? parseInt(props.max) : 999999999;
		if (intValue < minInt)
			intValue = minInt;
		if (intValue > maxInt)
			intValue = maxInt;
		return intValue.toString();
	}

	const intRx: RegExp = /\d/;
	const integerChange: (e: any) => void = (e: any): void => {
		//console.log(e.key);
		if (intRx.test(e.key) || e.key == 'Backspace')
			return;
		e.preventDefault();
	};

	useEffect((): (() => void) => {
		const input: HTMLDivElement = ref?.current;
		if (type == 'number')
			input.addEventListener("keydown", integerChange);

		return (): void => {
			input?.removeEventListener("keydown", integerChange);
		}
	}, []);

	return (
		<div ref={ref} className='Input' data-tooltip={props.tip}>
			{props.label ? <Label for={id}>{props.label}</Label> : null}
			<input
				className='Input-field'
				id={id}
				style={props.style}
				/* type={type}
				min={props.min}
				max={props.max}
				step={props.step} */
				placeholder={props.placeholder}
				pattern={pattern}
				value={value}
				onChange={onChange}>
			</input>
		</div>
	);
}

export default React.memo(Input);