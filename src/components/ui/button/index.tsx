/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** Button **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	onClick: () => void;
	children?: string;
	style?: CSSProperties;
}

const Button: FC<Props> = (props: Props): JSX.Element => {

	return (
		<button className='Button' style={props.style}
			onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => { e.stopPropagation(); e.preventDefault(); props.onClick() }}
		>
			{props.children}
		</button>
	);
}

export default React.memo(Button);