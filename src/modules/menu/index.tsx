/* Generated with TypeScript React snippets */

import { mapProps } from '@src/components/maps/Maps';
import { Button, Checkbox, Container, Glass, Input, Label, Line, Select } from '@src/components/ui';
import { useStore } from '@src/store/use-store';
import { gaEvent } from '@src/utils/ga4';
import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback, useMemo } from 'react';
import AudioLoop from '../audio';

/** Menu **
* ...
* @Author Star Noob
* @Created 2022-09-19
*/

interface Props { }

const Menu: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, mapStore, menuStore, modalStore } = useStore();

	const callbacks = {
		onPlayerIdChange: useCallback((value: string): void => {
			menuStore.setPlayerID(value);
		}, []),
		onAccountClick: useCallback((): void => {
			modalStore.setModal('ACCOUNTS');
		}, []),
		onHelpClick: useCallback((): void => {
			modalStore.setModal('HELP');
			gaEvent('Menu', 'Help');
		}, []),
		onMapSelect: useCallback((value: string): void => {
			menuStore.setSelectedMap(parseInt(value));
			gaEvent('Menu', 'Select Map', mapProps.get(parseInt(value)).title);
		}, []),
		onAutoSaveChange: useCallback((value: boolean): void => {
			menuStore.setAutoSave(value);
			gaEvent('Menu', 'Autosave Changed');
		}, []),
		onFullReset: useCallback((): void => {
			modalStore.setModal('CONFIRM', 'Are you sure you want to delete all accounts and saved banks from here?', [
				(): void => {
					accountStore.reset();
					mapStore.reset();
					menuStore.reset();
					modalStore.reset();
				}
			]);
			gaEvent('Menu', 'Full Reset');
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

	const [btnAccountsStyle, btnHelpStyle] = useMemo((): CSSProperties[] => {
		return [
			{ width: '80px' },
			{ width: '50px' }
		];
	}, []);

	const logo: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'row', alignItems: 'center' }}>
				<img src='assets/icons/favicon-32x32.png' width='30' height='30' />
				<Label style={{ fontSize: '20px' }}>Bank Generator</Label>
			</Container>
		);
	}, []);

	const top: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				{logo}
				<Container style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
					<Input label='Player id:' placeholder='X-SX-X-XXXXXXX' onChange={callbacks.onPlayerIdChange} tip="Player ID from bank's path" value={menuStore.playerID} />
					<Button style={btnAccountsStyle} onClick={callbacks.onAccountClick}>Accounts</Button>
					<Button style={btnHelpStyle} onClick={callbacks.onHelpClick}>Help</Button>
					<AudioLoop />
				</Container>
			</Container>
		);
	}, [menuStore.playerID]);

	const line: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Line style={{ margin: '10px 0 0 0' }} />
		);
	}, []);

	const bottom: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Select onChange={callbacks.onMapSelect} label={'Select map:'} selected={menuStore.selectedMap.toString()}>{mapList}</Select>
				<Checkbox label='Auto Save' onChange={callbacks.onAutoSaveChange} value={menuStore.autoSave} />
				<Button onClick={callbacks.onFullReset}>Clear Cache</Button>
			</Container>
		);
	}, [menuStore.selectedMap, menuStore.autoSave]);

	return (
		<Glass>
			<Container style={{ overflow: 'auto' }}>
				<Container style={{ flexDirection: 'column', padding: '10px' }}>
					{top}
					{line}
					{bottom}
				</Container>
			</Container>
		</Glass>
	);
});

export default React.memo(Menu);