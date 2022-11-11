/* Generated with TypeScript React snippets */

import filesaver from "file-saver";
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Checkbox from 'src/components/ui/checkbox';
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Select from 'src/components/ui/select';
import { Bank } from 'src/core/bank/bank';
import { BankKey } from 'src/core/bank/bank-key';
import { BankKeyType } from 'src/core/bank/bank-key-type';
import { BankMap } from 'src/core/bank/bank-map';
import { SCParam } from 'src/core/scarcode/sc-param';
import starcode from 'src/core/scarcode/starcode';
import { useStore } from 'src/hooks/use-store';
import Editor from 'src/modules/editor';
import { mapProps, Maps } from '../../Maps';
import { RR8Camera } from './RR8Camera';
import { RR8Info } from './RR8Info';
import { RR8Set2 } from "./RR8Set2";
import { RR8Slots } from './RR8Slots';
import { RR8Unit } from './RR8Unit';

/** RunlingRun4Form **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

interface Props {
	bankName?: string;
}

const RunlingRun8ILovePie: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, mapStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	const mapTitle: string = mapProps.get(Maps.RUNLING_RUN_8).title;
	const RR8_KEY: string = 'Ks8N10dj6L3M';
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');
	const units: RR8Unit[] = [
		new RR8Unit(1, 100),
		new RR8Unit(2, 100),
		new RR8Unit(3, 100),
		new RR8Unit(4, 100),
		new RR8Unit(5, 100),
		new RR8Unit(6, 100),
		new RR8Unit(7, 100),
		new RR8Unit(8, 100)
	];
	const prefix: number = parseInt(menuStore.playerID.split('-')[3]);
	const set2: RR8Set2 = new RR8Set2(prefix)
	const slots: RR8Slots = new RR8Slots();
	const info: RR8Info = new RR8Info(); // stats and settings
	const camera: RR8Camera = new RR8Camera(); // checksums
	const unitSelectorData: { value: string, label: string }[] = [
		{ value: '0', label: 'Empty' },
		{ value: '1', label: 'Ling' },
		{ value: '2', label: 'Bane' },
		{ value: '3', label: 'Hydra' },
		{ value: '4', label: 'Ultra' },
		{ value: '5', label: 'Roach' },
		{ value: '6', label: 'Impaler' },
		{ value: '7', label: 'Infested' },
		{ value: '8', label: 'Drone' },
	];

	// read from store (localStorage)
	useMemo((): void => {
		const storeParams: {
			units: { _current: number, _max: number, _description: string }[][],
			slots: { _current: number, _max: number, _description: string }[],
			info: { _current: number, _max: number, _description: string }[],
			camera: { _current: number, _max: number, _description: string }[],
			set2: { _current: number, _max: number, _description: string }[]
		} = mapStore.list[mapTitle]?.ilovepie;
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

		// 5. set2: // itited at start
		/* storeParams.set2.forEach((param: { _current: number, _max: number, _description: string }, i: number): void => {
			camera.queue[i].update(param._current);
		}); */

		//console.log('update data from store');
	}, [mapStore, units, slots, info, camera, set2]);

	// generate xml bank
	const xmlBank: string = useMemo((): string => {
		const section = { unit: 'unit', account: 'account' };
		const key = { info: 'info', camera: 'camera', set2: 'set2' }; // key.info uses in both sections

		// 1. unit section:
		if (!bank.sections.has(section.unit))
			bank.sections.set(section.unit, new BankMap(section.unit));
		let unitSum: number = 0;
		const bsu: BankMap<BankKey> = bank.sections.get(section.unit); // shortcut
		units.forEach((unit: RR8Unit, index: number): void => {
			const k: string = '0' + (index + 1);
			if (unit.queue[0].current > 0) { // if unit type != 'empty'
				if (!bsu.has(k))
					bsu.set(k, new BankKey(k, BankKeyType.STRING, ''));
				bsu.get(k).update(unit.write(starcode, RR8_KEY));
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
		bsu.get(key.info).update(slots.write(starcode, RR8_KEY))

		// 2. account section:
		if (!bank.sections.has(section.account))
			bank.sections.set(section.account, new BankMap(section.account));
		const bsa: BankMap<BankKey> = bank.sections.get(section.account); // shortcut
		if (!bsa.has(key.info))
			bsa.set(key.info, new BankKey(key.info, BankKeyType.STRING, ''));
		bsa.get(key.info).update(info.write(starcode, RR8_KEY));
		if (!bsa.has(key.camera))
			bsa.set(key.camera, new BankKey(key.camera, BankKeyType.STRING, ''));
		camera.queue[0].update(info.getSum()); // stats chesckum
		camera.queue[1].update(unitSum + prefix); // units checksum + playerID part
		bsa.get(key.camera).update(camera.write(starcode, RR8_KEY));
		if (!bsa.has(key.set2))
			bsa.set(key.set2, new BankKey(key.set2, BankKeyType.STRING, ''));
		set2.queue[0].update(prefix);
		bsa.get(key.set2).update(set2.write(starcode, RR8_KEY));

		// 3. sort and signature
		bank.sort();
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}, [units, slots, info, camera]);

	const makeSaveObject: () => {} = (): {} => {
		const unitsArray: {}[][] = [[], [], [], [], [], [], [], []];
		units.forEach((unit: RR8Unit, index: number): void => {
			unitsArray[index] = unit.queue;
		});
		const prestige: {} = mapStore.list[mapTitle]?.prestige;
		return { ilovepie: { units: unitsArray, slots: slots.queue, info: info.queue, camera: camera.queue, set2: set2.queue }, prestige };
	};

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((value: string): void => {
			const section = { unit: 'unit', account: 'account' };
			const key = { info: 'info', camera: 'camera', set2: 'set2' }; // key.info uses in both sections

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
					starcode.currentCode = bsu.get(k).value;
					units[i].read(starcode, RR8_KEY);
				} else
					units[i].queue[0].update(0); // type = 0 = empty slot
			}
			starcode.currentCode = bsu.get(key.info).value;
			slots.read(starcode, RR8_KEY);

			// 3. account
			const bsa: BankMap<BankKey> = bank.sections.get(section.account); // shortcut 
			starcode.currentCode = bsa.get(key.info).value;
			info.read(starcode, RR8_KEY);
			starcode.currentCode = bsa.get(key.camera).value;
			camera.read(starcode, RR8_KEY);
			starcode.currentCode = bsa.get(key.set2).value;
			set2.read(starcode, RR8_KEY);

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
			units.forEach((unit: RR8Unit): void => {
				unit.reset();
			});
			slots.reset();
			info.reset();
			camera.reset();
			set2.reset();
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
			if (index < 19)
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
					{units.map((unit: RR8Unit, index: number): JSX.Element => {
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
									max={'100'}
									placeholder='Level of unit (1-100)'
									value={unit.queue[7].current.toString()}
								/>
							</Container>
						);
					})}
				</Container>
				<Container style={{ flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }} alignInputs={true}>
					{info.queue.map((param: SCParam, index: number): JSX.Element => {
						if (index != 12 && index < 16)
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
						if (index < 16)
							return null;
						if (index < 19)
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

export default React.memo(RunlingRun8ILovePie);