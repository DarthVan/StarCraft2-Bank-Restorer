/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** Line **
* ...
* @Author Star Noob
* @Created 2022-10-03
*/

interface Props {
	style?: CSSProperties;
}

const Line: FC<Props> = (props: Props): JSX.Element => {
	return (
		<hr className="Line" style={props.style} />
	);
}

export default React.memo(Line);