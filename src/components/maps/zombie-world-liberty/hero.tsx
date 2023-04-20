/* Generated with TypeScript React snippets */

import React, { FC } from 'react';
import Checkbox from 'src/components/ui/checkbox';
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from 'src/components/ui/label';

/** ZWLHero **
* ...
* @Author Star Noob
* @Created 2023-04-17
*/

interface Props {
	onChange: (value: string | boolean, index: number, param: keyof Hero) => void;
	hero: Hero;
	index: number;
}

type Hero = {
	active: boolean;
	name: string;
	type: number;
	kills: number;
	level: number;
	prestige: number;
};

const ZWLHero: FC<Props> = (props: Props): JSX.Element => {

	return (
		<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '200px', marginBottom: '10px' }}>

			{
				props.index > 0 ? // sniper can't be disabled
					<Checkbox
						onChange={(value: boolean): void => props.onChange(value, props.index, 'active')}
						value={props.hero.active}
						label={props.hero.name}
						tip='Activate this hero?'
					/> : <Label>{props.hero.name}</Label>
			}

			<Container style={{ flexDirection: 'row' }}>

				<Input type='number' min='0' max='1500000000' style={{ width: '80px' }} tip='Kills'
					onChange={(value: string): void => props.onChange(value, props.index, 'kills')}
					value={props.hero.kills.toString()}
				/>

				<Input type='number' min='1' max='50' style={{ width: '20px' }} tip='Level'
					onChange={(value: string): void => props.onChange(value, props.index, 'level')}
					value={props.hero.level.toString()}
				/>

				<Input type='number' min='0' max='16' style={{ width: '20px' }} tip='Prestige'
					onChange={(value: string): void => props.onChange(value, props.index, 'prestige')}
					value={props.hero.prestige.toString()}
				/>

			</Container>
		</Container>
	);
}

export default React.memo(ZWLHero);