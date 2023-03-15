/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from "react-dom";
import Checkbox from "src/components/ui/checkbox";
import Container from 'src/components/ui/container';
import Input from 'src/components/ui/input';
import Label from "src/components/ui/label";
import Text from "src/components/ui/text";
import { Bank } from "src/core/bank/bank";
import { useStore } from "src/hooks/use-store";
import Editor from 'src/modules/editor';
import { copyTextToClipboard, downloadTextAsFile } from "src/utils/utils";
import { mapProps, Maps } from "../Maps";
import { MParam } from "../MParam";
import functions from "./functions";
import SsfSixBoolsItem from "./ssf-6b";
import SsfDiff from "./ssf-diff";

import store from "./store";

/** SwarmSpecialForcesForm **
* ...
* @Author Star Noob
* @Created 2022-11-12
*/

interface Props {
	bankName?: string;
}

const SwarmSpecialForcesForm: FC<Props> = observer((props: Props): JSX.Element => {
	const { accountStore, menuStore, mapStore, modalStore } = useStore();
	const [bankName, setBankName] = useState(props.bankName);
	const [authorID, setAuthorID] = useState(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
	const mapTitle: string = mapProps.get(Maps.SWARM_SCPECIAL_FORCES).title;

	const bank: Bank = useMemo((): Bank => {
		return new Bank(bankName, authorID, menuStore.playerID, '1');
	}, [accountStore.current, menuStore.playerID, bankName, authorID]);

	useEffect((): void => {
		functions.updateKey(menuStore.playerID);
	}, [bank]);

	useEffect((): void => {
		const fields: any = mapStore.list[accountStore.current]?.[mapTitle];
		flushSync((): void => store.setFields());
		if (fields)
			setTimeout((): void => store.setFields(fields));
		else
			setTimeout((): void => {
				store.reset();
				store.setFields(functions.generateDefault());
			});
	}, [accountStore.current]);

	const save: () => void = (): void => {
		mapStore.setMapData(accountStore.current, mapTitle, {
			light: store.light,
			heavy: store.heavy,
			speed: store.speed,
			options: store.options,
			bools: store.bools
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
			const fields: {
				light?: MParam[],
				heavy?: MParam[],
				speed?: MParam[][][],
				options?: MParam[],
				bools?: any[]
			} = functions.parse(bank, value);
			if (!fields)
				return;
			flushSync((): void => store.setFields()); // unmutate
			store.setFields(fields);
		}, []),
		onDownloadClick: useCallback((): void => {
			if (!menuStore.playerID.includes('-S2-')) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			functions.recryptAchives();
			downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onCopyCodeClick: useCallback((): void => {
			if (!menuStore.playerID.includes('-S2-')) {
				modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
				return;
			}
			functions.recryptAchives();
			copyTextToClipboard(functions.generateXML(bank), true);
			if (!menuStore.autoSave)
				save();
		}, [bank]),
		onResetClick: useCallback((): void => {
			setBankName(props.bankName);
			setAuthorID(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
			flushSync((): void => store.reset());
			store.setFields(functions.generateDefault());
		}, []),
		onFieldChange: useCallback((value: string | boolean, index?: number, group?: string): void => {
			switch (group) {
				case 'lightData':
					store.updateAt('light', index, parseInt(value as string), true);
					break;
				case 'heavyData':
					store.updateAt('heavy', index, store.heavy[index].type == 'number' ? parseInt(value as string) : value as boolean, true);
					break;
				case 'options':
					store.updateAt('options', index, store.heavy[index].type == 'number' ? parseInt(value as string) : value as boolean, true);
					break;
			}
			if (menuStore.autoSave)
				save();
		}, []),
		onSpeedrunsChange: useCallback((i: number, j: number, k: number, value: string): void => {
			store.updateAt('speed', { i, j, k }, value, true);
			if (menuStore.autoSave)
				save();
		}, []),
		onBoolsChange: useCallback((i: number, j: number, value: boolean): void => {
			store.updateAt('bools', { i, j }, value, true);
			if (menuStore.autoSave)
				save();
		}, [])
	};

	const info: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label>Please note that the map has a votekick system.</Label>
				<Text style={{ width: '1000px' }}>
					If other players suspect inconsistencies in your stats or values like 9999999, you can be kicked from the lobby.<br />
					To prevent this, use <b>Reset</b> button to generate random realistic statistics.<br />
				</Text>
			</>
		);
	}, []);

	const main: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label>Main stats:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }}>
					<Container style={{ flexDirection: 'column' }} alignInputs={true}>
						{store.light.map((param: MParam, index: number): JSX.Element => {
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
						{store.heavy.map((param: MParam, index: number): JSX.Element => {
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
			</>
		);
	}, [store.light, store.heavy]);

	const options: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label>Options:</Label>
				<Container style={{ flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }} alignInputs={true}>
					{store.options.map((param: MParam, index: number): JSX.Element => {
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
			</>
		);
	}, [store.options]);

	const speedruns: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label>Speedruns:</Label>
				<Container style={{ flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px' }}>
					<Container style={{ flexDirection: 'column', marginTop: '5px' }}>
						<Label style={{ marginTop: '45px' }}>Terran:</Label>
						<Label style={{ marginTop: '45px' }}>Protoss:</Label>
						<Label style={{ marginTop: '45px' }}>Mecha:</Label>
					</Container>
					<Container style={{ flexDirection: 'column', margin: '32px 0 0 20px' }}>
						<Label>Solo:</Label>
						<Label>Team:</Label>
						<Label style={{ marginTop: '20px' }}>Solo:</Label>
						<Label>Team:</Label>
						<Label style={{ marginTop: '20px' }}>Solo:</Label>
						<Label>Team:</Label>
					</Container>
					<>
						{store.speed.map((params: MParam[][], index: number): JSX.Element => {
							return (
								<SsfDiff onChange={callbacks.onSpeedrunsChange} array={params} i={index} />
							);
						})}
					</>
				</Container>
			</>
		);
	}, [store.speed]);

	const bools: JSX.Element = useMemo((): JSX.Element => {
		return (
			<>
				<Label>Achives (Easy, Normal, Hard, Brutal, Insane, Hardcore):</Label>
				<Container style={{ flexFlow: 'column wrap', justifyContent: 'space-around', border: '1px solid #ffffff40', maxHeight: '200px' }}>
					{store.bools.map((params: { flags: MParam[] }, index: number): JSX.Element => {
						return (
							params.flags?.length ? <SsfSixBoolsItem onChange={callbacks.onBoolsChange} array={params.flags} i={index} /> : null
						)
					})}
				</Container>
			</>
		);
	}, [store.bools]);

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
				{info}
				<Container style={{ flexDirection: 'row' }}>
					<Container style={{ flexDirection: 'column' }}>
						{main}
						{options}
					</Container>
					<Container style={{ flexDirection: 'column' }}>
						{speedruns}
						{bools}
					</Container>
				</Container>
			</Container>
		</Editor>
	);
});

export default React.memo(SwarmSpecialForcesForm);