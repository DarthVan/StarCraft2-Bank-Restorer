/* Generated with TypeScript React snippets */

import React, { CSSProperties, FC, useMemo } from 'react';
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

	const className: string = useMemo((): string => {
		let str: string = 'Container';
		if (props.style?.overflow == 'auto' || props.style?.overflowX == 'auto' || props.style?.overflowY == 'auto')
			str += ' ScrollContainer';
		else {
			if ((!props.style?.flexWrap || props.style?.flexWrap == 'nowrap') &&
				(!props.style?.flexFlow || props.style?.flexFlow?.split(' ')[1] == 'nowrap'))
				str += (props.style?.flexDirection == 'column' || props.style?.flexFlow?.split(' ')[0] == 'column')
					? ' ColumnContainer' : ' RowContainer';
			else
				str += ' WrapContainer';
			str += props.alignInputs ? ' TextFieldsContainer' : '';
		}
		return str;
	}, []); // выполнится всего 1 раз, чтоб не гонять эти условия

	return (
		<div className={className} style={props.style}>
			{props.children}
		</div>
	);
}

export default React.memo(FlexContainer);