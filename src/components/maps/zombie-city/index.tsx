/* Generated with TypeScript React snippets */

import { Container, Input, Label, Text } from '@src/components/ui';
import { Bank } from '@src/core/bank';
import { SCParam } from '@src/core/starcode';
import Editor from '@src/modules/editor';
import { useStore } from '@src/store/use-store';
import { copyTextToClipboard, downloadTextAsFile } from '@src/utils/utils';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { Maps, mapProps } from '../Maps';
import functions from './functions';
import store from './store';

/** ZombieCityForm **
* ...
* @Author Star Noob
* @Created 2022-09-28
*/

interface Props {
	bankName?: string;
}

const ZombieCityForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.ZOMBIE_CITY).authorID);
	const mapTitle: string = mapProps.get(Maps.ZOMBIE_CITY).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => { // а вот надо ли стор для этого хз...
		mapStore.setMapData(accountStore.current, mapTitle, store.queue);
	};

	useEffect((): void => {
		const fields: any = mapStore.list[accountStore.current]?.[mapTitle];
		if (fields)
			store.fromLocalStorage(fields);
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
			const fields: SCParam[] = functions.parse(bank, value);
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
			setAuthorID(mapProps.get(Maps.ZOMBIE_CITY).authorID);
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
			<Container style={{ flexDirection: 'column' }} alignInputs={true}>
				<Text>
					Note: this map has no validation, so<br /> you can skip <b>Player id</b> or <b>Author id</b> here.
				</Text>
				<>
					{store.queue.map((param: SCParam, index: number): any => {
						return (
							<Input key={index} index={index} type='number'
								style={{ width: '80px' }}
								label={param.description + ':'}
								onChange={callbacks.onFieldChange}
								min='0'
								max={param.max.toString()}
								value={param.current.toString()}
							/>
						);
					})}
				</>
			</Container>
		);
	}, [store.queue]);

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

export default React.memo(ZombieCityForm);