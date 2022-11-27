/* Generated with TypeScript React snippets */

import filesaver from "file-saver";
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import Checkbox from "src/components/ui/checkbox";
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from "src/components/ui/label";
import Text from "src/components/ui/text";
import { Bank } from "src/core/bank/bank";
import { useStore } from "src/hooks/use-store";
import Editor from 'src/modules/editor';
import { mapProps, Maps } from "../Maps";
import SsfDiff from "./ssf-diff";
import { SSFData } from "./SSFData";
import { SSFParam } from "./SSFParam";

/** SwarmSpecialForcesForm **
* ...
* @Author Star Noob
* @Created 2022-11-12
*/

interface Props {
	bankName?: string;
}

const SwarmSpecialForcesForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
	const mapTitle: string = mapProps.get(Maps.SWARM_SCPECIAL_FORCES).title;
	const bank: Bank = new Bank(bankName, authorID, menuStore.playerID, '1');
	const ssfData: SSFData = new SSFData(menuStore.playerID, true);

	useMemo((): void => {
		const storeParams: {
			lightData: SSFParam[],
			heavyData: SSFParam[],
			speedruns: SSFParam[][][],
			options: SSFParam[]
		} = mapStore.list[mapTitle];

		if (!storeParams) {
			ssfData.generateDefault();
			return;
		}

		ssfData.lightData = storeParams.lightData;
		ssfData.heavyData = storeParams.heavyData;
		ssfData.speedruns = storeParams.speedruns;
		ssfData.options = storeParams.options;

		console.log('update data from store');
	}, [mapStore, ssfData]);

	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			setBankName(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			setAuthorID(value);
		}, []),
		onFileDrop: useCallback((name: string, value: string): void => {
			bank.parse(value);
			if (bank.sections.size != 1 || !bank.sections.has('stats'))
				throw new Error('wrong bank file!');
			mapStore.setMapData(mapTitle, ssfData.read(bank));
		}, []),
		onDownloadClick: useCallback((): void => {
			if (menuStore.playerID.length < 12) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			const xml: string = ssfData.save(bank);
			console.log('download bank file:', xml);
			const blob = new Blob([xml], { type: 'application/octet-stream' });
			filesaver.saveAs(blob, bankName + '.SC2Bank');
		}, [ssfData]), // зависит от хмля банка
		onCopyCodeClick: useCallback((): void => {
			if (menuStore.playerID.length < 12) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			const xml: string = ssfData.save(bank);
			window.navigator['clipboard'].writeText(xml).then((): void => {
				console.log("Copied to clipboard:\n", xml);
			});
		}, [ssfData]), // зависит от хмля банка
		onResetClick: useCallback((): void => {
			setTimeout((): void => {
				setBankName(props.bankName);
				setAuthorID(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
			}, 1); // хак чтоб сделать ререндер чуть позже
			mapStore.setMapData(mapTitle, ssfData.generateDefault());
		}, []),
		onFieldChange: useCallback((value: string | boolean, index?: number, group?: string): void => {
			switch (group) {
				case 'lightData':
					ssfData.lightData[index].value = parseInt(value as string);
					break;
				case 'heavyData':
					ssfData.heavyData[index].value = ssfData.heavyData[index].type == 'number' ? parseInt(value as string) : value as boolean;
					break;
				case 'options':
					ssfData.options[index].value = ssfData.options[index].type == 'number' ? parseInt(value as string) : value as boolean;
					break;
			}
			mapStore.setMapData(mapTitle, ssfData.fullData);
		}, []),
		onSpeedrunsChange: useCallback((i: number, j: number, k: number, value: string): void => {
			ssfData.speedruns[i][j][k].value = value;
			mapStore.setMapData(mapTitle, ssfData.fullData);
		}, [])
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
				<Label>Please note that the map has a votekick system.</Label>
				<Text style={{ width: '670px' }}>
					If other players suspect inconsistencies in your statistics or values like 123456789,
					you can be kicked from the lobby.<br />
					To prevent this, use <b>Reset</b> button to generate random realistic statistics.<br />
				</Text>
				<Container style={{ flexDirection: 'row' }}>
					<Container style={{ flexDirection: 'column' }}>
						<Label>Main settings:</Label>
						<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }}>
							<Container style={{ flexDirection: 'column' }} alignInputs={true}>
								{ssfData.lightData.map((param: SSFParam, index: number): JSX.Element => {
									if (param.hidden)
										return null;
									return (
										<Input label={param.description + ':'} index={index} group='lightData' type='number' min='0'
											style={{ width: '75px' }}
											onChange={callbacks.onFieldChange}
											max={'999999999'}
											value={param.value.toString()}
										/>
									);
								})}
							</Container>
							<Container style={{ flexDirection: 'column' }} alignInputs={true}>
								{ssfData.heavyData.map((param: SSFParam, index: number): JSX.Element => {
									if (param.hidden)
										return null;
									if (param.type == 'number')
										return (
											<Input label={param.description + ':'} index={index} group='heavyData' type='number' min='0'
												style={{ width: '75px' }}
												onChange={callbacks.onFieldChange}
												max={'999999999'}
												value={param.value.toString()}
											/>
										);
									else
										return (
											<Checkbox label={param.description + ':'} index={index} group='heavyData'
												onChange={callbacks.onFieldChange}
												value={param.value as boolean}
											/>
										);
								})}
							</Container>
						</Container>
						<Label>Options:</Label>
						<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
							{ssfData.options.map((param: SSFParam, index: number): JSX.Element => {
								if (param.hidden)
									return null;
								if (param.type == 'number')
									return (
										<Input label={param.description + ':'} index={index} group='options' type='number' min='0'
											style={{ width: '30px' }}
											onChange={callbacks.onFieldChange}
											max={'999'}
											value={param.value.toString()}
										/>
									);
								else
									return (
										<Checkbox label={param.description + ':'} index={index} group='options'
											onChange={callbacks.onFieldChange}
											value={param.value as boolean}
										/>
									);
							})}
						</Container>
					</Container>
					<Container style={{ flexDirection: 'column' }}>
						{ssfData.speedruns.map((params: SSFParam[][], index: number): JSX.Element => {
							return (
								<SsfDiff onChange={callbacks.onSpeedrunsChange} array={params} i={index} />
							);
						})}
					</Container>
				</Container>
			</Container>
		</Editor>
	);
});

export default React.memo(SwarmSpecialForcesForm);