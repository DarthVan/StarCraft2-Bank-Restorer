/* Generated with TypeScript React snippets */

import filesaver from "file-saver";
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Checkbox from "src/components/ui/checkbox";
import Container from 'src/components/ui/container';
import Text from "src/components/ui/text";
import { Bank } from 'src/core/bank/bank';
import { BankKey } from "src/core/bank/bank-key";
import { BankKeyType } from "src/core/bank/bank-key-type";
import { BankMap } from "src/core/bank/bank-map";
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { mapProps, Maps } from '../../Maps';

/** RunLingRun8Prestige **
* ...
* @Author Star Noob
* @Created 2022-11-11
*/

interface Props {
	bankName?: string;
}

const RunLingRun8Prestige: FC<Props> = observer((props: Props): JSX.Element => {
	const { mapStore, menuStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	const mapTitle: string = mapProps.get(Maps.RUNLING_RUN_8).title;
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');
	const params: { active: boolean, hide: boolean } = { active: false, hide: false };

	// read from store (localStorage)
	useMemo((): void => {
		const storeParams: { active: boolean, hide: boolean } = mapStore.list[mapTitle]?.prestige;
		if (!storeParams)
			return;
		params.active = storeParams.active;
		params.hide = storeParams.hide;
		//console.log('update data from store');
	}, [mapStore, params]);

	// generate xml bank
	const xmlBank: string = useMemo((): string => {
		const section = 'HUD';
		const key = { active: 'Active', hide: 'Hide' };

		if (!bank.sections.has(section))
			bank.sections.set(section, new BankMap(section));
		const s: BankMap<BankKey> = bank.sections.get(section); // shortcut

		if (!s.has(key.active))
			s.set(key.active, new BankKey(key.active, BankKeyType.FLAG, ''));
		s.get(key.active).update(params.active ? '1' : '0');

		if (!s.has(key.hide))
			s.set(key.hide, new BankKey(key.hide, BankKeyType.FLAG, ''));
		s.get(key.hide).update(params.hide ? '1' : '0');

		//bank.sort();
		//bank.updateSignature();

		//console.log("bank const updated:", bank.getAsString());
		return bank.getAsString();
	}, [params]);

	const makeSaveObject: () => {} = (): {} => {
		const ilovepie: {} = mapStore.list[mapTitle]?.ilovepie;
		return { ilovepie, prestige: params };
	};

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			const section = 'HUD';
			const key = { active: 'Active', hide: 'Hide' };

			// 1. validate
			bank.parse(value);
			if (bank.sections.size != 1 || bank.sections.get(section) == null)
				throw new Error('wrong bank file!');

			// 2. update params
			params.active = bank.sections.get(section).get(key.active).value == '1';
			params.hide = bank.sections.get(section).get(key.hide).value == '1';

			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onDownloadClick: useCallback((): void => {
			console.log('download bank file:', xmlBank);
			const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
			filesaver.saveAs(blob, bankName + '.SC2Bank');
		}, [xmlBank]), // зависит от хмля банка
		onCopyCodeClick: useCallback((): void => {
			window.navigator['clipboard'].writeText(xmlBank).then((): void => {
				console.log("Copied to clipboard:\n", xmlBank);
			});
		}, [xmlBank]), // зависит от хмля банка
		onResetClick: useCallback((): void => {
			setTimeout((): void => {
				setBankName(props.bankName);
				setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
			}, 1); // хак чтоб сделать ререндер чуть позже
			params.active = false;
			params.hide = false;
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onSettingChange: useCallback((value: boolean, index?: number): void => {
			index == 0 ? params.active = value : params.hide = value;
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
	};

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
			<Container style={{ flexDirection: 'column' }}>
				<Text>This bank file is for HUD only</Text>
				<Container style={{ flexDirection: 'row', padding: '10' }}>
					<Checkbox label={'Active' + ':'} index={0}
						onChange={callbacks.onSettingChange}
						value={params.active}
					/>
					<Checkbox label={'Hide' + ':'} index={1}
						onChange={callbacks.onSettingChange}
						value={params.hide}
					/>
				</Container>
			</Container>
		</Editor>
	);
});

export default React.memo(RunLingRun8Prestige);