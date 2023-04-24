/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import Button from 'src/components/ui/button';
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from 'src/components/ui/label';
import Select from 'src/components/ui/select';
import Text from 'src/components/ui/text';
import { Bank } from 'src/core/bank/bank';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { copyTextToClipboard, downloadTextAsFile } from 'src/utils/utils';
import { MParam } from '../MParam';
import { Maps, mapProps } from '../Maps';
import functions from './functions';
import Hero from './hero';
import Jewel from './jewel';
import store from './store';

/** ZWLForm **
* ...
* @Author Star Noob
* @Created 2023-03-15
*/

interface Props {
	bankName?: string;
}

const ZWLForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).authorID);
	const mapTitle: string = mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => { // а вот надо ли стор для этого хз...
		mapStore.setMapData(accountStore.current, mapTitle, { stats: store.stats, heroes: store.heroes, jewels: store.jewels });
	};

	useEffect((): void => {
		const fields: { stats: MParam[], heroes: any[], jewels: any[] } = mapStore.list[accountStore.current]?.[mapTitle];
		if (fields) {
			flushSync((): void => store.setFields());
			setTimeout((): void => store.setFields(fields));
		} else
			setTimeout(callbacks.onResetClick);
	}, [accountStore.current]);

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			const fields: { stats: MParam[], heroes: any[], jewels: any[] } = functions.parse(bank, value);
			if (!fields)
				return;
			flushSync((): void => store.setFields()); // unmutate
			store.setFields(fields);
		}, []),
		onDownloadClick: useCallback((): void => {
			if (menuStore.playerID.split('-').length != 4) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onCopyCodeClick: useCallback((): void => {
			if (menuStore.playerID.split('-').length != 4) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			copyTextToClipboard(functions.generateXML(bank), true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onResetClick: useCallback((): void => {
			setBankName(props.bankName);
			setAuthorID(mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).authorID);
			flushSync((): void => store.setFields());
			store.reset();
		}, []),
		onFieldChange: useCallback((value: string, index?: number): void => {
			store.updateAt('stats', index, parseInt(value), true);
			if (menuStore.autoSave)
				save();
		}, []),
		onHeroChange: useCallback((value: string | boolean, i: number, key: any): void => {
			const mutation: boolean = key == 'active' ? false : true;
			store.updateAt('heroes', { i, key }, key == 'active' ? value as boolean : parseInt(value as string), mutation);
			if (menuStore.autoSave)
				save();
		}, []),
		onAllHeroSelect: useCallback((): void => {
			store.selectAllHero();
		}, []),
		onJewelAdd: useCallback((): void => {
			store.addJewel();
			if (menuStore.autoSave)
				save();
		}, []),
		onJewelsClear: useCallback((): void => {
			store.clearJewels();
			if (menuStore.autoSave)
				save();
		}, []),
		onJewelRemove: useCallback((index: number): void => {
			store.removeJewel(index);
			if (menuStore.autoSave)
				save();
		}, []),
		onJewelChange: useCallback((value: string, i: number, key: any): void => {
			store.updateAt('jewels', { i, key }, parseInt(value), false);
			if (menuStore.autoSave)
				save();
		}, [])
	};

	const stats: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label style={{ paddingTop: '5px' }}>Stats:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '230px', height: '145px' }} alignInputs={true}>
					{store.stats.map((param: MParam, index: number): JSX.Element => {
						if (index == 1)
							return <Select
								label='Best Solo:'
								onChange={callbacks.onFieldChange}
								selected={store.stats[1].value.toString()}
								index={index}
								style={{ width: '100px' }}
							>{functions.getDifficultTypes()}</Select>
						return <Input label={param.description + ':'} index={index} type='number'
							style={index == 0 ? { width: '80px' } : { width: '50px' }}
							onChange={callbacks.onFieldChange}
							min={index < 3 ? '0' : '100'}
							max={index == 0 ? '1500000000' : (index == 2 ? '500000' : '300')}
							value={param.value.toString()}
						/>
					})}
				</Container>
			</>
		);
	}, [store.stats]);

	const heroes: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Container style={{ flexDirection: 'row', alignItems: 'center', paddingTop: '20px' }}>
					<Label>Heroes:</Label>
					<Container style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Button onClick={callbacks.onAllHeroSelect}>Select all</Button>
					</Container>
				</Container>

				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '230px', height: '300px', overflowY: 'auto' }}>
					{store.heroes.map((hero, index: number): JSX.Element => {
						return <Hero hero={hero} onChange={callbacks.onHeroChange} index={index} />
					})}
				</Container>
			</>
		);
	}, [store.heroes]);

	const Jewels: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>

				<Container style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Label style={{ paddingTop: '5px' }}>Jewels:</Label>
					<Container style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Button onClick={callbacks.onJewelAdd}>Add</Button>
						<Button onClick={callbacks.onJewelsClear}>Clear</Button>
					</Container>
				</Container>

				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '600px', height: '508px', overflowY: 'auto' }}>
					{store.jewels.map((jewel, index: number): JSX.Element => {
						return <Jewel jewel={jewel} index={index} onChange={callbacks.onJewelChange} onRemove={callbacks.onJewelRemove} />
					})}
				</Container>

			</Container>
		);
	}, [store.jewels]);

	return (
		<Editor
			bankName={bankName}
			authorID={authorID}
			onBankNameChange={callbacks.onBankNameChange}
			onAuthorIdChange={callbacks.onAuthorIdChange}
			onFileDrop={callbacks.onFileDrop}
			onDownload={callbacks.onDownloadClick}
			onCopy={callbacks.onCopyCodeClick}
			onReset={callbacks.onResetClick}
		>
			<>
				<Text>Note: The map is still in beta. Some combinations can be bugged!</Text>
				<Container style={{ flexDirection: 'row' }}>
					<Container style={{ flexDirection: 'column' }}>
						{stats}
						{heroes}
					</Container>
					{Jewels}
				</Container>
			</>
		</Editor>
	);
});

export default React.memo(ZWLForm);