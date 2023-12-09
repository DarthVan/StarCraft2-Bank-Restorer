/* Generated with TypeScript React snippets */

import { Container, Input, Select, Text } from '@src/components/ui';
import Label from '@src/components/ui/label';
import { Bank } from '@src/core/bank';
import Editor from '@src/modules/editor';
import { useStore } from '@src/store/use-store';
import { copyTextToClipboard, downloadTextAsFile } from '@src/utils/utils';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { MParam } from '../MParam';
import { Maps, mapProps } from '../Maps';
import functions from './functions';
import store from './store';

/** EndOfDreamsForm **
* ...
* @Author Star Noob
* @Created 2023-12-09
*/

interface Props {
	bankName?: string;
}

const EndOfDreamsForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.END_OF_DREAMS).authorID);
	const mapTitle: string = mapProps.get(Maps.END_OF_DREAMS).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => { // а вот надо ли стор для этого хз...
		mapStore.setMapData(accountStore.current, mapTitle, store.params);
	};

	const ranks: { value: string, label: string }[] = useMemo((): { value: string, label: string }[] => {
		return [
			{ value: 'Beginner', label: 'Beginner' },
			{ value: 'Amateur', label: 'Amateur' },
			{ value: 'Newbie', label: 'Newbie' },
			{ value: 'Novice', label: 'Novice' },
			{ value: 'Soldier', label: 'Soldier' },
			{ value: 'Slayer', label: 'Slayer' },
			{ value: 'Hunter', label: 'Hunter' },
			{ value: 'Assasin', label: 'Assasin' },
			{ value: 'Commander', label: 'Commander' },
			{ value: 'Mutant', label: 'Mutant' },
			{ value: 'Specialop', label: 'Specialop' },
			{ value: 'Guardian', label: 'Guardian' },
			{ value: 'Colonel', label: 'Colonel' },
			{ value: 'Executor', label: 'Executor' },
			{ value: 'SwarmHost', label: 'SwarmHost' },
			{ value: 'Templar', label: 'Templar' },
			{ value: 'Predator', label: 'Predator' },
			{ value: 'General', label: 'General' },
			{ value: 'Preserver', label: 'Preserver' },
			{ value: 'Master', label: 'Master' },
			{ value: 'Overmind', label: 'Overmind' },
			{ value: 'WarLord', label: 'WarLord' },
			{ value: 'Legendary', label: 'Legendary' },
			{ value: 'Titan', label: 'Titan' },
			{ value: 'Hero', label: 'Hero' },
		]
	}, []);

	useEffect((): void => {
		const fields: MParam[] = mapStore.list[accountStore.current]?.[mapTitle];
		if (fields)
			store.setFields(fields);
		else
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
			const fields: MParam[] = functions.parse(bank, value);
			if (!fields)
				return;
			flushSync((): void => store.setFields()); // unmutate
			store.setFields(fields);
		}, []),
		onDownloadClick: useCallback((): void => {
			downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onCopyCodeClick: useCallback((): void => {
			copyTextToClipboard(functions.generateXML(bank), true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onResetClick: useCallback((): void => {
			setBankName(props.bankName);
			setAuthorID(mapProps.get(Maps.END_OF_DREAMS).authorID);
			flushSync((): void => store.setFields());
			store.reset();
		}, []),
		onFieldChange: useCallback((value: string, index: number): void => {
			store.updateAt(index, parseInt(value), true); // на списке мутацию нельзя
			if (menuStore.autoSave)
				save();
		}, []),
		onRankChange: useCallback((value: string, index: number): void => {
			store.updateAt(index, value, false);
			if (menuStore.autoSave)
				save();
		}, []),
	}

	// Форму обновляем только если ее данные изменились
	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>

				<Text>
					Note: this map has no validation, so<br /> you can skip <b>Player id</b> or <b>Author id</b> here.
				</Text>

				<Label>Stats:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
					{store.params.map((param: MParam, index: number): any => {
						if (index < 3)
							return index == 0 ?
								<Select key={index} label='Rank:' index={index}
									style={{ width: '100px' }}
									onChange={callbacks.onRankChange}
									selected={param.value.toString()}
								>{ranks}</ Select>
								:
								<Input key={index} index={index} type='number'
									style={{ width: '88px' }}
									label={param.description + ':'}
									onChange={callbacks.onFieldChange}
									min={param.min.toString()}
									max={param.max.toString()}
									value={param.value.toString()}
									tip={param.tip ? param.tip : null}
								/>
					})}
				</Container>

				<Label>Wins:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
					{store.params.map((param: MParam, index: number): any => {
						if (index > 2)
							return (
								<Input key={index} index={index} type='number'
									style={{ width: '88px' }}
									label={param.description + ':'}
									onChange={callbacks.onFieldChange}
									min={param.min.toString()}
									max={param.max.toString()}
									value={param.value.toString()}
									tip={param.tip ? param.tip : null}
								/>
							);
					})}
				</Container>

			</Container>
		);
	}, [store.params]);

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
			{form}
		</Editor>
	);
});

export default React.memo(EndOfDreamsForm);