/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** Accounts **
* ...
* @Author Star Noob
* @Created 2023-01-13
*/

interface Props {
	onChange?: (value: string) => void;
	children?: JSX.Element[];
	style?: CSSProperties;
}

const Accounts: FC<Props> = (props: Props): JSX.Element => {
	return (
		<div className='Accounts' style={props.style}>

		</div>
	);
}

export default React.memo(Accounts);