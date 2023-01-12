/* Generated with TypeScript React snippets */

import mui from '@mui/material';
import filesaver from "file-saver";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useMemo, useState } from 'react';
import Button from 'src/components/ui/button';
import Container from "src/components/ui/container";
import Label from 'src/components/ui/label';
import { Bank } from "src/core/bank/bank";
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { mapProps, Maps } from '../Maps';

/** AnySimple **
* ...
* @Author Star Noob
* @Created 2022-11-26
*/

interface Props {

}

const AnySimple: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState('');
	const [authorID, setAuthorID] = useState('');
	const [sxml, setSXML] = useState('');
	const mapTitle: string = mapProps.get(Maps.ANY_SIMPLE).title;
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');

	useMemo((): void => {
		const storeParams: {
			bankName: string,
			authorID: string,
			xml: string
		} = mapStore.list[mapTitle];

		if (!storeParams)
			return;

		setBankName(storeParams.bankName);
		setAuthorID(storeParams.authorID);
		setSXML(storeParams.xml);

		console.log('update data from store');
	}, [mapStore]);

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
			mapStore.setMapData(mapTitle, { bankName: value, authorID, xml: sxml });
		}, [authorID, sxml]),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
			mapStore.setMapData(mapTitle, { bankName, authorID: value, xml: sxml });
		}, [bankName, sxml]),
		onFileDrop: useCallback((name: string, value: string): void => {
			bank.parse(value);
			bank.sort();
			const xml: string = bank.getAsString();
			setBankName(name);
			setSXML(xml);
			mapStore.setMapData(mapTitle, { bankName: name, authorID, xml });
		}, [bankName, authorID]),

		onDownloadClick: useCallback((): void => {
			if (menuStore.playerID.length < 12 || authorID.length < 12 || bankName.length < 1)
				modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');

			console.log('download bank file:', sxml);
			const blob = new Blob([sxml], { type: 'application/octet-stream' });
			filesaver.saveAs(blob, bankName + '.SC2Bank');
		}, [bankName, authorID, sxml]),

		onCopyCodeClick: useCallback((): void => {
			if (menuStore.playerID.length < 12 || authorID.length < 12 || bankName.length < 1)
				modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');

			window.navigator['clipboard'].writeText(sxml).then((): void => {
				console.log("Copied to clipboard:\n", sxml);
			});
		}, [bankName, authorID, sxml]),
		onResetClick: useCallback((): void => {
			setTimeout((): void => {
				setBankName('');
				setAuthorID('');
				setSXML('');
			}, 1);
			mapStore.setMapData(mapTitle, null);
		}, []),
		onFieldChange: useCallback((value: string): void => {
			//bank.parse(value);
			//bank.sort();
			//bank.updateSignature();
			//const xml: string = bank.getAsString();
			setSXML(value);
			mapStore.setMapData(mapTitle, { bankName, authorID, xml: value });
		}, [bankName, authorID]),
		updateSignature: useCallback((): void => {
			bank.parse(sxml);
			bank.sort();
			bank.updateSignature();
			const xml: string = bank.getAsString();
			setSXML(xml);
			mapStore.setMapData(mapTitle, { bankName, authorID, xml });
		}, [bankName, authorID, sxml]),
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
						},
						/* '& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: '#ffffff40',
							},
							'&:hover fieldset': {
								borderColor: '#ffffff40',
							},
							'&.Mui-focused fieldset': {
								borderColor: '#ffffffcc',
							},
						} */
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
		</Editor>
	);
})

export default React.memo(AnySimple);