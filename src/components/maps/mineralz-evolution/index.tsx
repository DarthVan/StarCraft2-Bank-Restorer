/* Generated with TypeScript React snippets */

import { Container, Input, Text } from '@src/components/ui';
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

/** MineralzEvolutionForm **
* ...
* @Author Star Noob
* @Created 2022-09-28
*/

interface Props {
	bankName?: string;
}

const MineralzEvolutionForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.MINERALZ_EVOLUTION).authorID);
	const mapTitle: string = mapProps.get(Maps.MINERALZ_EVOLUTION).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => { // а вот надо ли стор для этого хз...
		mapStore.setMapData(accountStore.current, mapTitle, store.params);
	};

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
			setAuthorID(mapProps.get(Maps.MINERALZ_EVOLUTION).authorID);
			flushSync((): void => store.setFields());
			store.reset();
		}, []),
		onFieldChange: useCallback((value: string, index: number): void => {
			store.updateAt(index, parseInt(value), true); // мутация включена!
			if (menuStore.autoSave)
				save();
		}, [])
	}

	// Форму обновляем только если ее данные изменились
	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>

				<Text style={{ width: '500px' }}>
					Note: the community of this map closely monitors the statistics of the players, their skills and match history, so <b>use the hack wisely!</b><br /><br />
					The <b>Reset</b> button generates random real stats, but avoid using it with more than <b>5 Prestige</b> / <b>5 Impossible</b>.<br />
					Or add <b>+20 levels</b> / <b>+5 wins</b> / <b>+2 role wins</b> after every game to looks legit.<br />
				</Text>

				<Label>Main stats:</Label>
				<Container style={{ flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px', justifyContent: 'space-around' }} alignInputs={true}>
					{store.params.map((param: MParam, index: number): any => {
						if (index < 3)
							return (
								<Input key={index} index={index} type='number'
									style={{ width: '50px' }}
									label={param.description + ':'}
									onChange={callbacks.onFieldChange}
									min={param.min.toString()}
									max={param.max.toString()}
									value={param.value.toString()}
									tip={param.tip ? param.tip : null}
								/>
							);
						else return null;
					})}
				</Container >

				<Label>Survived nights and roles:</Label>
				<Container style={{ flexDirection: 'row' }}>

					<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
						{store.params.map((param: MParam, index: number): any => {
							if (index >= 3 && index < 8)
								return (
									<Input key={index} index={index} type='number'
										style={{ width: '30px' }}
										label={param.description + ':'}
										onChange={callbacks.onFieldChange}
										min={param.min.toString()}
										max={param.max.toString()}
										value={param.value.toString()}
										tip={param.tip ? param.tip : null}
									/>
								);
							else return null;
						})}
					</Container>

					<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
						{store.params.map((param: MParam, index: number): any => {
							if (index >= 8)
								return (
									<Input key={index} index={index} type='number'
										style={{ width: '50px' }}
										label={param.description + ':'}
										onChange={callbacks.onFieldChange}
										min={param.min.toString()}
										max={param.max.toString()}
										value={param.value.toString()}
										tip={param.tip ? param.tip : null}
									/>
								);
							else return null;
						})}
					</Container>

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

export default React.memo(MineralzEvolutionForm);