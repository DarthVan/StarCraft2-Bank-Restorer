/* Generated with TypeScript React snippets */

import { Button, Container, Input } from '@src/components/ui';
import React, { FC, useCallback, useMemo, useState } from 'react';

/** AccountItem **
* ...
* @Author Star Noob
* @Created 2023-01-14
*/

interface Props {
	onNameChange: (id: string, value: string) => void;
	onPlayerIDChange: (id: string, value: string) => void;
	onSelect: (value: string, playerID: string) => void;
	onRemove: (id: string) => void;
	id: string;
	name: string;
	playerID: string;
	selected: boolean;
}

const AccountItem: FC<Props> = (props: Props): JSX.Element => {
	const [state, setState] = useState('default');

	const callbacks = {
		onMouseEnter: useCallback((): void => {
			setState('hover');
		}, []),
		onMouseLeave: useCallback((): void => {
			setState('default');
		}, [])
	};

	const getStyle: () => {} = (): {} => {
		let color: string = '#00000000';
		const style = {
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			height: '70px',
			width: 'calc(100% - 10px)',
			minWidth: '620px',
			cursor: 'pointer',
			backgroundColor: '#00000000',
			transition: '0.4s'
		};
		switch (state) {
			case 'default': color = props.selected ? '#00CCFF44' : '#00000000'; break;
			case 'hover': color = props.selected ? '#00CCFF44' : '#00CCFF22'; break;
		}
		style.backgroundColor = color;
		return style;
	}

	const elements: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<img src='assets/images/noob.png' width='59' height='59' />
				<Input onChange={(value: string): void => props.onNameChange(props.id, value)} label={'Name:'} placeholder={'Noob'} value={props.name} tip='Any nick name' />
				<Input onChange={(value: string): void => props.onPlayerIDChange(props.id, value)} label={'Palyer ID:'} tip='Player ID from account path' placeholder={'X-SX-X-XXXXXXX'} value={props.playerID} />
				<Button onClick={(): void => props.onRemove(props.id)} style={{ width: '100px' }}>Remove</Button>
			</>
		);
	}, []);

	return (
		<div
			onMouseEnter={callbacks.onMouseEnter}
			onMouseLeave={callbacks.onMouseLeave}
			onClick={e => props.onSelect(props.id, props.playerID)}
		>
			<Container style={getStyle()}>
				{elements}
			</Container >
		</div >
	);
}

export default React.memo(AccountItem);