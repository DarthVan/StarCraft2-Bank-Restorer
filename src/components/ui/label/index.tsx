/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** Label **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	children: string;
	style?: CSSProperties;
	for?: string;
}

const Label: FC<Props> = (props: Props): JSX.Element => {
	return (
		<label htmlFor={props.for} className='Label' style={props.style}>{props.children}</label>
	);
}

export default React.memo(Label);