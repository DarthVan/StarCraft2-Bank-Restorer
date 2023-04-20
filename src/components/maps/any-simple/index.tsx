/* Generated with TypeScript React snippets */

import mui from '@mui/material';
import filesaver from "file-saver";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Button from 'src/components/ui/button';
import Container from "src/components/ui/container";
import Label from 'src/components/ui/label';
import { Bank } from "src/core/bank/bank";
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { copyTextToClipboard, downloadTextAsFile } from 'src/utils/utils';
import { Maps, mapProps } from '../Maps';

/** AnySimple **
* ...
* @Author Star Noob
* @Created 2022-11-26
*/

interface Props {

}

const AnySimple: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState('');
	const [authorID, setAuthorID] = useState('');
	const [sxml, setSXML] = useState('');
	const mapTitle: string = mapProps.get(Maps.ANY_SIMPLE).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	useEffect((): void => {
		const storeParams: { bankName: string, authorID: string, xml: string } = mapStore.list[accountStore.current]?.[mapTitle];
		if (!storeParams) {
			callbacks.onResetClick();
			return;
		}
		setBankName(storeParams.bankName);
		setAuthorID(storeParams.authorID);
		setSXML(storeParams.xml);
	}, [accountStore.current]);

	const save: () => void = (): void => {
		mapStore.setMapData(accountStore.current, mapTitle, { bankName, authorID, xml: sxml });
	};

	useEffect((): void => {
		if (menuStore.autoSave)
			save();
	}, [bankName, authorID, sxml]);

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			bank.parse(value);
			bank.sort();
			setBankName(name);
			setSXML(bank.getAsString());
		}, []),
		onDownloadClick: useCallback((): void => {
			if (menuStore.playerID.split('-').length != 4 || authorID.split('-').length != 4 || bankName.length < 1)
				modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
			downloadTextAsFile(sxml, bankName + '.SC2Bank', true)
			if (!menuStore.autoSave)
				save();
		}, [bank, sxml]),
		onCopyCodeClick: useCallback((): void => {
			if (menuStore.playerID.split('-').length != 4 || authorID.split('-').length != 4 || bankName.length < 1)
				modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
			copyTextToClipboard(sxml, true);
			if (!menuStore.autoSave)
				save();
		}, [bank, sxml]),
		onResetClick: useCallback((): void => {
			setBankName('');
			setAuthorID('');
			setSXML('');
		}, []),
		onFieldChange: useCallback((value: string): void => {
			setSXML(value);
		}, []),
		updateSignature: useCallback((): void => {
			bank.parse(sxml);
			bank.sort();
			bank.updateSignature();
			setSXML(bank.getAsString());
		}, [bank, sxml]),
	};

	const form: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column' }}>
				<Label>Simple text editor for any banks, that protected with signature only. Drop file to edit it.</Label>
				<mui.TextField
					sx={{
						width: '900px',
						"& .MuiInputBase-root": {
							color: '#CCCCFF',
							fontFamily: 'Consolas',
							fontSize: '12px'
						},
						"& .MuiFormLabel-root": {
							color: '#7777FF',
							fontFamily: 'Consolas'
						},
						"& .MuiFormLabel-root.Mui-focused": {
							color: '#CCCCFF',
							fontFamily: 'Consolas'
						}
					}}
					id="standard-multiline-flexible"
					label="XML Bank Data"
					multiline
					minRows={10}
					maxRows={30}
					value={sxml}
					onChange={(e): void => callbacks.onFieldChange(e.target.value)}
					variant="standard"
					InputProps={{ disableUnderline: true, spellCheck: 'false' }}
				>
				</mui.TextField>
				<Button onClick={callbacks.updateSignature} style={{ width: '150px' }}>Update Signature</Button>
			</Container>
		);
	}, [bank, sxml]);

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
})

export default React.memo(AnySimple);