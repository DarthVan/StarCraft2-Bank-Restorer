/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, useMemo } from 'react';
import Label from '../label';
import './style.css';

/** Checkbox **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

interface Props {
	onChange: (value: boolean, index?: number) => void;
	style?: CSSProperties;
	label?: string;
	value?: boolean;
	index?: number;
}

const Checkbox: FC<Props> = (props: Props): JSX.Element => {

	const id: string = useMemo((): string => {
		return props.label ? props.label + Math.random() * 100000 : null;
	}, [props.label]);

	return (
		<div className='Checkbox'>
			{props.label ? <Label for={id}>{props.label}</Label> : null}
			<input
				className='Checkbox-rect'
				style={props.style}
				type="checkbox"
				id={id}
				checked={props.value}
				onChange={e => props.onChange(e.target.checked, props.index)}
			></input>
		</div>
	);
}

export default React.memo(Checkbox);