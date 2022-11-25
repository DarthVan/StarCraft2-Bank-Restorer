/* Generated with TypeScript React snippets */

import filesaver from "file-saver";
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Flex from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import { Bank } from 'src/core/bank/bank';
import { BankKey } from 'src/core/bank/bank-key';
import { BankKeyType } from 'src/core/bank/bank-key-type';
import { BankMap } from 'src/core/bank/bank-map';
import { SCParam } from 'src/core/scarcode/sc-param';
import starcode from 'src/core/scarcode/starcode';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { mapProps, Maps } from '../Maps';
import { ZcStats } from './ZcStats';

/** ZombieCityForm **
* ...
* @Author Star Noob
* @Created 2022-09-28
*/

interface Props {
	bankName?: string;
}

const ZombieCityForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, mapStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.ZOMBIE_CITY).authorID);
	const mapTitle: string = mapProps.get(Maps.ZOMBIE_CITY).title;
	const ZC_KEY: string = 'OnFbXRyxYzPuv7of(v5v7[zdvUiDzXO]gVb9FVI9b>M>l}Gt6L';
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');
	const zcStats: ZcStats = new ZcStats();

	useMemo((): void => {
		const storeParams: Array<{ _current: number, _max: number, _description: string }> = mapStore.list[mapTitle];
		if (!storeParams)
			return;
		storeParams.forEach((value: { _current: number, _max: number, _description: string }, i: number): void => {
			zcStats.queue[i].update(value._current);
		});
	}, [mapStore, zcStats]);

	const xmlBank: string = useMemo((): string => {
		const sID: string = '23EGWEG234AG4';
		const kID: string = 'AWEO322AOIGWE3wqogej23';
		if (!bank.sections.has(sID))
			bank.sections.set(sID, new BankMap(sID));
		if (!bank.sections.get(sID).has(kID))
			bank.sections.get(sID).set(kID,
				new BankKey(kID, BankKeyType.STRING, ''));
		bank.sections.get(sID).get(kID).update(zcStats.write(starcode, ZC_KEY));
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}, [zcStats]);

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((value: string): void => {
			bank.parse(value);
			if (bank.sections.size != 1 || bank.sections.get('23EGWEG234AG4') == null)
				throw new Error('wrong bank file!');
			starcode.reset();
			starcode.code = bank.sections.get('23EGWEG234AG4').get('AWEO322AOIGWE3wqogej23').value;
			zcStats.read(starcode, ZC_KEY);
			mapStore.setMapData(mapTitle, [...zcStats.queue]);
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
				setAuthorID(mapProps.get(Maps.ZOMBIE_CITY).authorID);
			}, 1); // хак чтоб сделать ререндер чуть позже
			zcStats.reset();
			mapStore.setMapData(mapTitle, [...zcStats.queue]);
		}, []),
		onFieldChange: useCallback((value: string, index?: number): void => {
			zcStats.queue[index].update(parseInt(value));
			mapStore.setMapData(mapTitle, [...zcStats.queue]);
		}, [])
	}

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
			<Flex style={{ flexDirection: 'column' }} alignInputs={true}>
				{zcStats.queue.map((param: SCParam, index: number): any => {
					return (
						<Input label={param.description + ':'} index={index} type='number' min='0'
							onChange={callbacks.onFieldChange}
							max={param.max.toString()}
							value={param.current.toString()}
						/>
					);
				})}
			</Flex>
		</Editor>
	);
})

export default React.memo(ZombieCityForm);