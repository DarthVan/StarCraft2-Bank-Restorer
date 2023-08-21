/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, useMemo } from 'react';
import Label from '../label';
import './style.css';

/** Select **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	onChange: (value: string, index?: number, group?: string) => void;
	children: Array<{ value: string, label: string }>;
	selected: string;
	style?: CSSProperties;
	label?: string;
	placeholder?: string;
	index?: number;
	group?: string;
}

const Select: FC<Props> = (props: Props): JSX.Element => {

	const id: string = useMemo((): string => {
		return props.label ? props.label + Math.random() * 100000 : null;
	}, [props.label]);

	const options: React.ReactElement = useMemo((): React.ReactElement => {
		return <>
			{props.children.map((item: { value: string, label: string }, index: number): React.ReactElement => {
				return <option
					key={index} // для статических списков норм, но для динамических - хз.
					value={item.value}
					className={"Select-option"}
				>{item.label}</option>;
			})}
		</>
	}, [props.children, props.selected]);

	return (
		<div className='Select'>
			{props.label ? <Label for={id}>{props.label}</Label> : null}
			<select
				id={id}
				className='Select-box'
				value={props.selected}
				style={props.style}
				placeholder={props.placeholder}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => props.onChange(e.target.value, props.index, props.group)}
			>{options}</select>
		</div>
	);
}

export default React.memo(Select);