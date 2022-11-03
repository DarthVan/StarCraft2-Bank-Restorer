/* Generated with TypeScript React snippets */

import React, { FC, useMemo } from 'react';
import './style.css';

/** Label **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	children: string;
	style?: { fontSize?: string };
	for?: string;
}

const Label: FC<Props> = (props: Props): JSX.Element => {

	const [first, other] = useMemo((): [string, string] => {
		return [props.children.charAt(0), props.children.substring(1)];
	}, [props.children]);

	return (
		<label htmlFor={props.for} className='Label'>
			<span className='Label-start' style={props.style}>{first}</span>
			<span className='Label-other' style={props.style}>{other}</span>
		</label>
	);
}

export default React.memo(Label);