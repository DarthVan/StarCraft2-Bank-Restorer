/* Generated with TypeScript React snippets */

import { Button, Container, Input, Select } from '@src/components/ui';
import React, { FC } from 'react';
import functions from './functions';

/** ZWLJewel **
* ...
* @Author Star Noob
* @Created 2023-04-17
*/

interface Props {
	onChange: (value: string, index: number, param: keyof Jewel) => void;
	onRemove: (index: number) => void;
	jewel: Jewel;
	index: number;
}

type Jewel = {
	type: number;
	minerals: number;
	damage: number;
	life: number;
	armor: number;
	speed: number;
	unique: number;
	upgrade: number;
};

const ZWLJewel: FC<Props> = (props: Props): JSX.Element => {
	const types: { value: string, label: string }[] = functions.getJewelTypes();
	const unics: { value: string, label: string }[] = functions.getUniqueJewelsTypes();
	const { min, max } = functions.getJewelRange(props.jewel.type);

	return (
		<Container style={{ flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px', width: '570px', height: 'min-content', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
			<Container style={{ flexDirection: 'row' }}>

				<Select style={{ width: '100px', margin: '0' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'type')}
					selected={props.jewel.type.toString()}
				>{types}</Select>

				<Input type='number' style={{ width: '35px' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'minerals')}
					value={props.jewel.minerals.toString()}
					min={(min * 10).toString()}
					max={(max * 10).toString()}
					tip={'Minerals:' + (min * 10) + '-' + (max * 10)}
				/>

				<Input type='number' style={{ width: '25px' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'damage')}
					value={props.jewel.damage.toString()}
					min={min.toString()}
					max={max.toString()}
					tip={'Damage:' + min + '-' + max}
				/>

				<Input type='number' style={{ width: '25px' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'life')}
					value={props.jewel.life.toString()}
					min={min.toString()}
					max={max.toString()}
					tip={'Life:' + min + '-' + max}
				/>

				<Input type='number' style={{ width: '25px' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'armor')}
					value={props.jewel.armor.toString()}
					min={min.toString()}
					max={max.toString()}
					tip={'Armor:' + min + '-' + max}
				/>

				<Input type='number' style={{ width: '25px' }}
					onChange={(value: string): void => props.onChange(value, props.index, 'speed')}
					value={props.jewel.speed.toString()}
					min={min.toString()}
					max={max.toString()}
					tip={'Speed:' + min + '-' + max}
				/>

				{
					props.jewel.type == 12 ?
						<Select style={{ width: '160px', margin: '0' }}
							onChange={(value: string): void => props.onChange(value, props.index, 'unique')}
							selected={props.jewel.unique.toString()}
						>{unics}</Select>
						: null
				}
			</Container>
			<Button onClick={(): void => props.onRemove(props.index)} style={{ width: '25px' }}>×</Button>
		</Container >
	);
}

export default React.memo(ZWLJewel);