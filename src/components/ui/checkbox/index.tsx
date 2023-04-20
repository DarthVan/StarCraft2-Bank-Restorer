/* Generated with TypeScript React snippets */

import React, { ChangeEvent, CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';
import Label from '../label';
import './style.css';

/** Checkbox **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

interface Props {
	onChange: (value: boolean, index?: number, group?: string) => void;
	style?: CSSProperties;
	label?: string;
	value?: boolean;
	index?: number;
	group?: string;
	tip?: string;
}

const Checkbox: FC<Props> = (props: Props): JSX.Element => {

	const id: string = useMemo((): string => {
		return props.label ? props.label + Math.random() * 100000 : null;
	}, [props.label]);

	const [value, setValue] = useState(props.value);
	useEffect((): void => {
		setValue(props.value);
	}, [props.value]);

	const onChange: (e: ChangeEvent<HTMLInputElement>) => void = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		const value: boolean = e.target.checked;
		setValue(value);
		props.onChange(value, props.index, props.group);
	}, []);

	return (
		<div className='Checkbox' data-tooltip={props.tip}>
			{props.label ? <Label for={id}>{props.label}</Label> : null}
			<input
				className='Checkbox-rect'
				style={props.style}
				type="checkbox"
				id={id}
				checked={value}
				onChange={onChange}
			></input>
		</div>
	);
}

export default React.memo(Checkbox);