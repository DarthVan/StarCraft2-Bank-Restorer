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

/** Exodus3Form **
* ...
* @Author Star Noob
* @Created 2024-01-14
*/

interface Props {
	bankName?: string;
}

const Exodus3Form: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.EXODUS_3).authorID);
	const mapTitle: string = mapProps.get(Maps.EXODUS_3).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	const save: () => void = (): void => {
		mapStore.setMapData(accountStore.current, mapTitle, { resources: store.resources });
	};

	useEffect((): void => {
		const data: any = mapStore.list[accountStore.current]?.[mapTitle]; // {}
		const fields: MParam[] = data?.resources;
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
			setAuthorID(mapProps.get(Maps.EXODUS_3).authorID);
			flushSync((): void => store.setFields());
			store.reset();
		}, []),
		onFieldChange: useCallback((value: string, index: number): void => {
			store.updateAt(index, parseInt(value), true);
			if (menuStore.autoSave)
				save();
		}, []),
	}

	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>

				<Text>
					Note: this map has no validation, so you<br /> can skip <b>Player id</b> or <b>Author id</b> here.
					<br /><br />
					While the map in beta, I'm too lazy to add<br /> inputs for each game param :P<br />Hacking resources allows you to get<br /> anything in the game.
				</Text>

				<Label>Resources:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
					{store.resources.map((param: MParam, index: number): any => {
						return <Input key={index} index={index} type='number'
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

			</Container>
		);
	}, [store.resources]);

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

export default React.memo(Exodus3Form);