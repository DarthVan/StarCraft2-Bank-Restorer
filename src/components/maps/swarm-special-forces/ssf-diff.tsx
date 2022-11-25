/* Generated with TypeScript React snippets */

import React, { FC } from 'react';
import Container from 'src/components/ui/container';
import Label from 'src/components/ui/label';
import { MapStore } from 'src/store/MapStore';
import SSFPartElement from './ssf-part';
import { SSFParam } from './SSFParam';

/** SSFDiffElement **
* ...
* @Author Star Noob
* @Created 2022-11-24
*/

interface Props {
	onChange: (i: number, j: number, k: number, value: string) => void;
	array: SSFParam[][];
	i: number;
}

const SSFDiffElement: FC<Props> = (props: Props): JSX.Element => {
	let title: string;
	switch (props.i) {
		case 0: title = 'Easy'; break;
		case 1: title = 'Normal'; break;
		case 2: title = 'Hard'; break;
		case 3: title = 'Brutal'; break;
		case 4: title = 'Insane'; break;
		case 5: title = 'Hardcore'; break;
	}
	return (
		<>
			<Label>{title + ' speedruns:'}</Label>
			<Container style={{ flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px' }}>
				{props.array.map((params: SSFParam[], index: number): JSX.Element => {
					return (
						<SSFPartElement onChange={props.onChange} array={params} i={props.i} j={index} />
					)
				})}
			</Container>
		</>
	);
}

export default React.memo(SSFDiffElement);