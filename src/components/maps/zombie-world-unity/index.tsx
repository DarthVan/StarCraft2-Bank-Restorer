/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import Checkbox from 'src/components/ui/checkbox';
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from 'src/components/ui/label';
import { Bank } from 'src/core/bank/bank';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { copyTextToClipboard, downloadTextAsFile } from 'src/utils/utils';
import { MParam } from '../MParam';
import { Maps, mapProps } from '../Maps';
import functions from './functions';
import store from './store';

/** ZWUForm **
* ...
* @Author Star Noob
* @Created 2023-03-15
*/

interface Props {
	bankName?: string;
}

const ZWUForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.ZOMBIE_WORLD_UNITY).authorID);
	const mapTitle: string = mapProps.get(Maps.ZOMBIE_WORLD_UNITY).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => { // а вот надо ли стор для этого хз...
		mapStore.setMapData(accountStore.current, mapTitle, store.params);
	};

	useEffect((): void => {
		const fields: MParam[] = mapStore.list[accountStore.current]?.[mapTitle];
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
			const fields: MParam[] = functions.parse(bank, value);
			if (!fields)
				return;
			flushSync((): void => store.setFields()); // unmutate
			store.setFields(fields);
		}, []),
		onDownloadClick: useCallback((): void => {
			if (!menuStore.playerID.includes('-S2-')) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onCopyCodeClick: useCallback((): void => {
			if (!menuStore.playerID.includes('-S2-')) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			copyTextToClipboard(functions.generateXML(bank), true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onResetClick: useCallback((): void => {
			setBankName(props.bankName);
			setAuthorID(mapProps.get(Maps.ZOMBIE_WORLD_UNITY).authorID);
			flushSync((): void => store.setFields());
			store.reset();
		}, []),
		onFieldChange: useCallback((value: string | boolean, index?: number): void => {
			store.updateAt(index, store.params[index].type == 'number' ? parseInt(value as string) : value as boolean, true);
			if (menuStore.autoSave)
				save();
		}, [])
	}

	// Форму обновляем только если ее данные изменились
	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'row' }}>

				<Container style={{ flexDirection: 'column' }}>
					<Label>Stats:</Label>
					<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
						{store.params.map((param: MParam, index: number): JSX.Element => {
							if (param.hidden)
								return null;
							if (index < 2)
								return (
									<Input label={param.description + ':'} index={index} type='number' min='0'
										style={{ width: '40px' }}
										onChange={callbacks.onFieldChange}
										max={index == 0 ? '16999' : '45000'}
										value={param.value.toString()}
									/>
								);
							else return null;
						})}
					</Container>

					<Label style={{ paddingTop: '24px' }}>Options:</Label>
					<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
						{store.params.map((param: MParam, index: number): JSX.Element => {
							if (param.hidden)
								return null;
							if (index > 1 && index < 5)
								return (
									<Checkbox label={param.description + ':'} index={index}
										onChange={callbacks.onFieldChange}
										value={param.value as boolean}
									/>
								);
							else return null;
						})}
					</Container>

				</Container>

				<Container style={{ flexDirection: 'column' }}>
					<Label>Kills:</Label>
					<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
						{store.params.map((param: MParam, index: number): JSX.Element => {
							if (param.hidden)
								return null;
							if (index > 4)
								return (
									<Input label={param.description + ':'} index={index} type='number' min='0'
										style={{ width: '80px' }}
										onChange={callbacks.onFieldChange}
										max={'1500000000'}
										value={param.value.toString()}
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

export default React.memo(ZWUForm);