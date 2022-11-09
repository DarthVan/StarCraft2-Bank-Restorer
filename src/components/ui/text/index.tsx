/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, PropsWithChildren } from 'react';
import './style.css';

/** Text **
* ...
* @Author Star Noob
* @Created 2022-11-06
*/

interface Props extends PropsWithChildren {
	style?: CSSProperties;
}

const Text: FC<Props> = (props: Props): JSX.Element => {
	return (
		<span className='Text' style={props.style}>
			{props.children}
		</span>
	);
}

export default React.memo(Text);