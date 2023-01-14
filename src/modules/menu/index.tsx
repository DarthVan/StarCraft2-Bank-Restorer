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
	const { mapStore, menuStore, modalStore } = useStore();

	const callbacks = {
		onPlayerIdChange: useCallback((value: string): void => {
			menuStore.setPlayerID(value);
		}, []),
		onAccountClick: useCallback((): void => {
			modalStore.setModal('ACCOUNTS');
		}, []),
		onHelpClick: useCallback((): void => {
			modalStore.setModal('HELP');
		}, []),
		onMapSelect: useCallback((value: string): void => {
			menuStore.setSelectedMap(parseInt(value));
		}, []),
		onShowCodeChange: useCallback((value: boolean): void => {
			menuStore.setShowCode(value);
		}, []),
		onFullReset: useCallback((): void => {
			mapStore.reset();
			menuStore.reset();
			modalStore.reset();
		}, [])
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
						<Flex style={{ flexDirection: 'row', alignItems: 'center' }}>
							<img src='assets/sc2.ico' width='30' height='30' />
							<Label style={{ fontSize: '20px' }}>Bank Generator</Label>
						</Flex>
						<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
							<Input label="Player id:" placeholder="X-SX-X-XXXXXXX" onChange={callbacks.onPlayerIdChange} tip="Player ID from bank's path" value={menuStore.playerID} />
							<Button style={{ width: '80px' }} onClick={callbacks.onAccountClick}>Accounts</Button>
							<Button style={{ width: '50px' }} onClick={callbacks.onHelpClick}>Help</Button>
						</Flex>
					</Flex>

					<Line style={{ margin: '10px 0 0 0' }} />

					<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Select onChange={callbacks.onMapSelect} label={"Select map:"} selected={menuStore.selectedMap.toString()}>{mapList}</Select>
						<Checkbox label='Show Code' onChange={callbacks.onShowCodeChange} />
						<Button onClick={callbacks.onFullReset}>Clear Cache</Button>
					</Flex>

				</Flex>
			</Flex>
		</GlassWrapper>
	);
});

export default React.memo(Menu);