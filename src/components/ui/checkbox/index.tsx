/* Generated with TypeScript React snippets */

import React, { ChangeEvent, CSSProperties, FC, useMemo } from 'react';
import Label from '../label';
import './style.css';

/** Checkbox **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

interface Props {
	onChange?: (value: string) => void;
	style?: CSSProperties;
	label?: string;
	value?: boolean;
}

const Checkbox: FC<Props> = (props: Props): JSX.Element => {

	const id: string = useMemo((): string => {
		return props.label ? props.label + Math.random() * 100000 : null;
	}, [props.label]);

	return (
		<div className='Checkbox' style={props.style}>
			{props.label ? <Label for={id}>{props.label}</Label> : null}
			<input
				className='Checkbox-rect'
				type="checkbox"
				id={id}
				checked={props.value}
				onChange={(e: ChangeEvent<HTMLInputElement>): void => props.onChange(e.target.value)}
			></input>
		</div>
	);
}

export default React.memo(Checkbox);