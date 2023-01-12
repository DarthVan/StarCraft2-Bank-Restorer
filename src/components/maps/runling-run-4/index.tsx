/* Generated with TypeScript React snippets */

import filesaver from "file-saver";
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Checkbox from 'src/components/ui/checkbox';
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from 'src/components/ui/label';
import Select from 'src/components/ui/select';
import { Bank } from 'src/core/bank/bank';
import { BankKey } from 'src/core/bank/bank-key';
import { BankKeyType } from 'src/core/bank/bank-key-type';
import { BankMap } from 'src/core/bank/bank-map';
import { SCParam } from 'src/core/scarcode/sc-param';
import starcode from 'src/core/scarcode/starcode';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { mapProps, Maps } from '../Maps';
import { RR4Camera } from './RR4Camera';
import { RR4Info } from './RR4Info';
import { RR4Slots } from './RR4Slots';
import { RR4Unit } from './RR4Unit';

/** RunlingRun4Form **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

interface Props {
	bankName?: string;
}

const RunlingRun4Form: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.RUNLING_RUN_4).authorID);
	const mapTitle: string = mapProps.get(Maps.RUNLING_RUN_4).title;
	const RR4_KEY: string = 'WalkerKey';
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');
	const units: RR4Unit[] = [
		new RR4Unit(1, 75),
		new RR4Unit(2, 75),
		new RR4Unit(3, 75),
		new RR4Unit(4, 75),
		new RR4Unit(5, 75),
		new RR4Unit(0, 75),
		new RR4Unit(0, 75),
		new RR4Unit(0, 75)
	];
	const slots: RR4Slots = new RR4Slots();
	const info: RR4Info = new RR4Info(); // stats and settings
	const camera: RR4Camera = new RR4Camera(); // checksums
	const prefix: number = parseInt(menuStore.playerID.split('-')[3]); // 2410462;
	const unitSelectorData: { value: string, label: string }[] = [
		{ value: '0', label: 'Empty' },
		{ value: '1', label: 'Ling' },
		{ value: '2', label: 'Bane' },
		{ value: '3', label: 'Hydra' },
		{ value: '4', label: 'Ultra' },
		{ value: '5', label: 'Roach' }
	];

	// read from store (localStorage)
	useMemo((): void => {
		const storeParams: {
			units: { _current: number, _max: number, _description: string }[][],
			slots: { _current: number, _max: number, _description: string }[],
			info: { _current: number, _max: number, _description: string }[],
			camera: { _current: number, _max: number, _description: string }[]
		} = mapStore.list[mapTitle];
		if (!storeParams)
			return;

		// 1. units:
		storeParams.units.forEach((unit: { _current: number, _max: number, _description: string }[], i: number): void => {
			unit.forEach((param: { _current: number, _max: number, _description: string }, j: number): void => {
				units[i].queue[j].update(param._current);
			});
		});

		// 2. slots:
		storeParams.slots.forEach((param: { _current: number, _max: number, _description: string }, i: number): void => {
			slots.queue[i].update(param._current);
		});

		// 3. info:
		storeParams.info.forEach((param: { _current: number, _max: number, _description: string }, i: number): void => {
			info.queue[i].update(param._current);
		});

		// 4. camera:
		storeParams.camera.forEach((param: { _current: number, _max: number, _description: string }, i: number): void => {
			camera.queue[i].update(param._current);
		});

		console.log('update data from store');
	}, [mapStore, units, slots, info, camera]); // todo: в порядок привести, чтоб не перерендерировать все, и в 8м тоже

	// generate xml bank
	const xmlBank: string = useMemo((): string => {
		if (!bank.info.playerID || bank.info.playerID.length < 12)
			return '';

		const section = { unit: 'unit', account: 'account' };
		const key = { info: 'info', camera: 'camera' }; // key.info uses in both sections

		// 1. unit section:
		if (!bank.sections.has(section.unit))
			bank.sections.set(section.unit, new BankMap(section.unit));
		let unitSum: number = 0;
		const bsu: BankMap<BankKey> = bank.sections.get(section.unit); // shortcut
		units.forEach((unit: RR4Unit, index: number): void => {
			const k: string = '0' + (index + 1);
			if (unit.queue[0].current > 0) { // if unit type != 'empty'
				if (!bsu.has(k))
					bsu.set(k, new BankKey(k, BankKeyType.STRING, ''));
				bsu.get(k).update(unit.write(starcode, RR4_KEY));
				unitSum += unit.getSum();
				slots.setSlot(index, true);
			} else {
				if (bsu.has(k))
					bsu.delete(k);
				slots.setSlot(index, false);
			}
		});
		if (!bsu.has(key.info))
			bsu.set(key.info, new BankKey(key.info, BankKeyType.STRING, ''));
		bsu.get(key.info).update(slots.write(starcode, RR4_KEY))

		// 2. account section:
		if (!bank.sections.has(section.account))
			bank.sections.set(section.account, new BankMap(section.account));
		const bsa: BankMap<BankKey> = bank.sections.get(section.account); // shortcut
		if (!bsa.has(key.info))
			bsa.set(key.info, new BankKey(key.info, BankKeyType.STRING, ''));
		bsa.get(key.info).update(info.write(starcode, RR4_KEY));
		if (!bsa.has(key.camera))
			bsa.set(key.camera, new BankKey(key.camera, BankKeyType.STRING, ''));
		camera.queue[0].update(info.getSum()); // stats chesckum
		camera.queue[1].update(unitSum + prefix); // units checksum + playerID part
		bsa.get(key.camera).update(camera.write(starcode, RR4_KEY));

		// 3. sort and signature
		bank.sort();
		bank.updateSignature();
		console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}, [units, slots, info, camera]);

	const makeSaveObject: () => {} = (): {} => {
		const unitsArray: {}[][] = [[], [], [], [], [], [], [], []];
		units.forEach((unit: RR4Unit, index: number): void => {
			unitsArray[index] = unit.queue;
		});
		return { units: unitsArray, slots: slots.queue, info: info.queue, camera: camera.queue };
	};

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			const section = { unit: 'unit', account: 'account' };
			const key = { info: 'info', camera: 'camera' }; // key.info uses in both sections

			// 1. validate
			bank.parse(value);
			if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null)
				throw new Error('wrong bank file!');

			// 2. units
			starcode.reset();
			const bsu: BankMap<BankKey> = bank.sections.get(section.unit); // shortcut
			for (let i: number = 0; i < 8; i++) {
				const k: string = '0' + (i + 1);
				if (bsu.has(k)) {
					starcode.code = bsu.get(k).value;
					units[i].read(starcode, RR4_KEY);
				} else
					units[i].queue[0].update(0); // type = 0 = empty slot
			}
			starcode.code = bsu.get(key.info).value;
			slots.read(starcode, RR4_KEY);

			// 3. account
			const bsa: BankMap<BankKey> = bank.sections.get(section.account); // shortcut 
			starcode.code = bsa.get(key.info).value;
			info.read(starcode, RR4_KEY);
			starcode.code = bsa.get(key.camera).value;
			camera.read(starcode, RR4_KEY);

			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onDownloadClick: useCallback((): void => {
			if (menuStore.playerID.length < 12) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			console.log('download bank file:', xmlBank);
			const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
			filesaver.saveAs(blob, bankName + '.SC2Bank');
		}, [xmlBank]), // зависит от хмля банка
		onCopyCodeClick: useCallback((): void => {
			if (menuStore.playerID.length < 12) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			window.navigator['clipboard'].writeText(xmlBank).then((): void => {
				console.log("Copied to clipboard:\n", xmlBank);
			});
		}, [xmlBank]), // зависит от хмля банка
		onResetClick: useCallback((): void => {
			setTimeout((): void => {
				setBankName(props.bankName);
				setAuthorID(mapProps.get(Maps.RUNLING_RUN_4).authorID);
			}, 1); // хак чтоб сделать ререндер чуть позже
			units.forEach((unit: RR4Unit): void => {
				unit.reset();
			});
			slots.reset();
			info.reset();
			camera.reset();
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onUnitTypeChange: useCallback((value: string, index?: number): void => {
			const intValue: number = parseInt(value);
			units[index].queue[0].update(intValue);
			slots.setSlot(index, intValue == 1);
			//camera.queue[1].update(unitSum + prefix); // units checksum + playerID part
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onUnitLevelChange: useCallback((value: string, index?: number): void => {
			const intValue: number = parseInt(value);
			units[index].setLevel(intValue); // via setLevel only!
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onStatChange: useCallback((value: string, index?: number): void => {
			info.queue[index].update(parseInt(value));
			camera.queue[0].update(info.getSum()); // stats chesckum
			mapStore.setMapData(mapTitle, makeSaveObject());
		}, []),
		onSettingChange: useCallback((value: string | boolean, index?: number): void => {
			if (index < 20)
				info.queue[index].update(parseInt(value as string)); // here are 3 text inputs
			else
				info.queue[index].update(value ? 1 : 0);
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
			<Container style={{ flexDirection: 'row', padding: '0' }}>
				<Container style={{ flexFlow: 'column', padding: '0', justifyContent: 'space-around', border: '1px solid #ffffff40' }}>
					{units.map((unit: RR4Unit, index: number): JSX.Element => {
						return (
							<Container style={{ flexDirection: 'row', padding: '10px' }}>
								<Select label={'Unit ' + (index + 1) + ':'}
									index={index}
									style={{ width: '90px' }}
									onChange={callbacks.onUnitTypeChange}
									selected={unit.queue[0].current.toString()}
								>{unitSelectorData}</ Select>
								<Input label='Level:' index={index} type='number' min='1'
									style={{ width: '30px' }}
									onChange={callbacks.onUnitLevelChange}
									max={'75'}
									placeholder='Level of unit (1-75)'
									value={unit.queue[7].current.toString()}
								/>
							</Container>
						);
					})}
				</Container>
				<Container style={{ flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }} alignInputs={true}>
					{info.queue.map((param: SCParam, index: number): JSX.Element => {
						if (index != 12 && index < 17)
							return (
								<Input label={param.description + ':'} index={index} type='number' min='0'
									style={{ width: '45px' }}
									onChange={callbacks.onStatChange}
									max={param.max.toString()}
									value={param.current.toString()}
								/>
							);
						else
							return null;
					})}
				</Container>
				<Container style={{ flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }} alignInputs={true}>
					{info.queue.map((param: SCParam, index: number): JSX.Element => {
						if (index < 17)
							return null;
						if (index < 20)
							return (
								<Input label={param.description + ':'} index={index} type='number' min='1'
									style={{ width: '45px' }}
									onChange={callbacks.onSettingChange}
									max={param.max.toString()}
									value={param.current.toString()}
								/>
							);
						else
							return (
								<Checkbox label={param.description + ':'} index={index}
									onChange={callbacks.onSettingChange}
									value={param.current == 1}
								/>
							);
					})}
				</Container>
			</Container>
		</Editor>
	);
});

export default React.memo(RunlingRun4Form);