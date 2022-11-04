/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo } from "react";
import { mapProps } from 'src/components/maps/Maps';
import Button from 'src/components/ui/button';
import Checkbox from 'src/components/ui/checkbox';
import Flex from 'src/components/ui/container';
import GlassWrapper from 'src/components/ui/glass-wrapper';
import Input from 'src/components/ui/input';
import Label from 'src/components/ui/label';
import Line from 'src/components/ui/line';
import Select from 'src/components/ui/select';
import { useStore } from 'src/hooks/use-store';

/** Menu **
* ...
* @Author Star Noob
* @Created 2022-09-19
*/

interface Props {

}

const Menu: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore } = useStore();

	const callbacks = {
		onPlayerIdChange: useCallback((value: string): void => {
			menuStore.setPlayerID(value);
		}, [menuStore]),
		onHelpClick: useCallback((): void => {
			console.log('menu -> help click!');
		}, [menuStore]),
		onMapSelect: useCallback((value: string): void => {
			menuStore.setSelectedMap(parseInt(value));
		}, [menuStore]),
		onShowCodeChange: useCallback((value: boolean): void => {
			//menuStore.setSelectedMap(parseInt(value));
		}, [menuStore])
	}

	// шаманим данные для выпадающего списка
	const mapList: Array<{ value: string, label: string }> = useMemo(() => {
		const result: Array<{ value: string, label: string }> = [];
		mapProps.forEach((value, key: number): void => {
			result.push({ value: key.toString(), label: value.title });
		});
		return result;
	}, [menuStore.selectedMap]);

	return (
		<GlassWrapper>
			<Flex style={{ overflow: 'auto' }}>
				<Flex style={{ flexDirection: 'column', padding: '10px' }}>

					<Flex style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Label style={{ fontSize: '20px' }}>SC2 Bank Generator</Label>
						<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<Input label="Player id:" placeholder="X-SX-X-XXXXXXX" onChange={callbacks.onPlayerIdChange} tip="Player ID from bank's path" value={menuStore.playerID} />
							<Button style={{ width: '50px' }} onClick={callbacks.onHelpClick}>help</Button>
						</Flex>
					</Flex>

					<Line style={{ margin: '10px 0 0 0' }} />

					<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Select onChange={callbacks.onMapSelect} label={"Select map:"} selected={menuStore.selectedMap.toString()}>{mapList}</Select>
						<Checkbox label='Show Code' onChange={callbacks.onShowCodeChange} />
						<Button onClick={(): void => { }}>Clear Cache</Button>
					</Flex>

				</Flex>
			</Flex>
		</GlassWrapper>
	);
});

export default React.memo(Menu);