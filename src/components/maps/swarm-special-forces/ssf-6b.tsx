/* Generated with TypeScript React snippets */

import React, { FC, useCallback } from 'react';
import Checkbox from 'src/components/ui/checkbox';
import Container from 'src/components/ui/container';
import Label from 'src/components/ui/label';
import { MParam } from '../MParam';

/** SSFSixBoolsItem **
* ...
* @Author Star Noob
* @Created 2023-01-11
*/

interface Props {
	onChange: (i: number, j: number, value: boolean) => void;
	array: MParam[];
	i: number;
}

const SSFSixBoolsItem: FC<Props> = (props: Props): JSX.Element => {
	const group: string = props.array[0].description.split(' ')[0];

	const callbacks = {
		onChange: useCallback((value: boolean, index: number): void => {
			props.onChange(props.i, index, value);
		}, [])
	};

	return (
		<Container style={{ flexDirection: 'row', justifyContent: 'space-between', width: '200px' }}>
			<Label>{group + ':'}</Label>
			<Container style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				{props.array.map((param: MParam, index: number): JSX.Element => {
					return (
						<Checkbox index={index} onChange={callbacks.onChange}
							value={param.value as boolean}
							style={{ margin: '4px -3px -4px -3px' }}
						/>
					);
				})}
			</Container>
		</Container>
	);
};

export default React.memo(SSFSixBoolsItem);