/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Checkbox from "src/components/ui/checkbox";
import Container from 'src/components/ui/container';
import Text from "src/components/ui/text";
import { Bank } from 'src/core/bank/bank';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { copyTextToClipboard, downloadTextAsFile } from "src/utils/utils";
import { mapProps, Maps } from '../../Maps';
import functions from "./functions";
import store from "./store";

/** RunLingRun8Prestige **
* ...
* @Author Star Noob
* @Created 2022-11-11
*/

interface Props {
	bankName?: string;
}

const RunLingRun8Prestige: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, mapStore, menuStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	const mapTitle: string = mapProps.get(Maps.RUNLING_RUN_8).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	useEffect((): void => {
		const fields: any = mapStore.list[accountStore.current]?.[mapTitle]?.prestige;
		if (fields)
			store.setFields(fields);
		else
			setTimeout(callbacks.onResetClick);
	}, [accountStore.current]);

	const save: () => void = (): void => {
		const ilovepie: {} = mapStore.list[accountStore.current]?.[mapTitle]?.ilovepie;
		mapStore.setMapData(accountStore.current, mapTitle, {
			ilovepie,
			prestige: { active: store.active, hide: store.hide }
		});
	};

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			store.setFields(functions.parse(bank, value));
		}, []),
		onDownloadClick: useCallback((): void => {
			downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
			if (!menuStore.autoSave)
				save();
		}, [bank]), // зависит от хмля банка
		onCopyCodeClick: useCallback((): void => {
			copyTextToClipboard(functions.generateXML(bank), true);
			if (!menuStore.autoSave)
				save();
		}, [bank]), // зависит от хмля банка
		onResetClick: useCallback((): void => {
			setBankName(props.bankName);
			setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
			store.reset();
		}, []),
		onSettingChange: useCallback((value: boolean, index?: number): void => {
			index == 0 ? store.updateAt('active', value) : store.updateAt('hide', value);
			if (menuStore.autoSave)
				save();
		}, []),
	};

	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>
				<Text>This bank file is for HUD only</Text>
				<Container style={{ flexDirection: 'row', padding: '10px' }}>
					<Checkbox label={'Active' + ':'} index={0}
						onChange={callbacks.onSettingChange}
						value={store.active}
					/>
					<Checkbox label={'Hide' + ':'} index={1}
						onChange={callbacks.onSettingChange}
						value={store.hide}
					/>
				</Container>
			</Container>
		);
	}, [store.active, store.hide]);

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

export default React.memo(RunLingRun8Prestige);