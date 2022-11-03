/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** GlassWrapper **
* ...
* @Author Star Noob
* @Created 2022-09-18
*/

interface Props {
	children: JSX.Element;
	style?: CSSProperties;
	border?: boolean;

}

const GlassWrapper: FC<Props> = (props: Props): JSX.Element => {
	return (
		<div className={'GlassWrapper' + (props.border ? ' GlassWrapperBordered' : '')} style={props.style}>
			<div className='GlassWrapper-content'>
				{props.children}
			</div>
		</div>
	)
}

export default React.memo(GlassWrapper);