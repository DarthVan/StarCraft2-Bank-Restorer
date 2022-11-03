/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC } from 'react';
import './style.css';

/** FlexContainer **
* ...
* @Author Star Noob
* @Created 2022-10-26
*/

interface Props {
	children?: JSX.Element[] | JSX.Element;
	style?: CSSProperties;
	alignInputs?: boolean;
}

const FlexContainer: FC<Props> = (props: Props): JSX.Element => {

	let className: string = 'Container';
	if (props.style?.overflow == 'auto' || props.style?.overflowX == 'auto' || props.style?.overflowY == 'auto')
		className += ' ScrollContainer';
	else {
		if ((!props.style?.flexWrap || props.style?.flexWrap == 'nowrap') &&
			(!props.style?.flexFlow || props.style?.flexFlow?.split(' ')[1] == 'nowrap'))
			className += (props.style?.flexDirection == 'column' || props.style?.flexFlow?.split(' ')[0] == 'column')
				? ' ColumnContainer' : ' RowContainer';
		else
			className += ' WrapContainer';
		className += props.alignInputs ? ' TextFieldsContainer' : '';
	}

	return (
		<div className={className} style={props.style}>
			{props.children}
		</div>
	);
}

export default React.memo(FlexContainer);