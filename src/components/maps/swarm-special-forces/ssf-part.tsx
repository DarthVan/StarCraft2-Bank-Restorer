/* Generated with TypeScript React snippets */

import { Container, Input } from '@src/components/ui';
import React, { FC, useCallback } from 'react';
import { MParam } from '../MParam';

/** SSFPartElement **
* ...
* @Author Star Noob
* @Created 2022-11-24
*/

interface Props {
	onChange: (i: number, j: number, k: number, value: string) => void;
	array: MParam[];
	i: number;
	j: number;
}

const SSFPartElement: FC<Props> = (props: Props): JSX.Element => {
	/* let title: string;
	switch (props.j) {
		case 0: title = 'Terran'; break;
		case 1: title = 'Protoss'; break;
		case 2: title = 'Mecha'; break;
	} */

	const callbacks = {
		onFieldChange: useCallback((value: string, index: number): void => {
			props.onChange(props.i, props.j, index, value);
		}, [])
	};

	return (
		<Container style={{ flexDirection: 'column' }}>
			{props.j > 0 ? <div style={{ height: '1px' }} /> : null}
			<Container style={{ flexDirection: 'column' }}>
				{props.array.map((param: MParam, index: number): JSX.Element => {
					if (param.hidden)
						return null;
					return (
						<Input key={index} index={index} type='text' style={{ width: '70px' }}
							/* label={index == 0 ? 'Solo' : 'Team'} */
							onChange={callbacks.onFieldChange}
							value={param.value.toString()}
						/>
					);
				})}
			</Container>
		</Container>
	);
}

export default React.memo(SSFPartElement);