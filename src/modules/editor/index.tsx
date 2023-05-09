/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo } from 'react';
import { mapProps } from 'src/components/maps/Maps';
import Button from 'src/components/ui/button';
import Flex from 'src/components/ui/container';
import Drop from 'src/components/ui/drop';
import Input from 'src/components/ui/input';
import Line from 'src/components/ui/line';
import { useStore } from 'src/hooks/use-store';
import { gaEvent } from 'src/utils/ga4';

/** Editor **
* ...
* @Author Star Noob
* @Created 2022-09-27
*/

interface Props {
	bankName?: string;
	authorID?: string;
	children?: JSX.Element;
	onFileDrop?: (name: string, value: string) => void;
	onBankNameChange?: (value: string) => void;
	onAuthorIdChange?: (value: string) => void;
	onDownload?: () => void;
	onCopy?: () => void;
	onReset?: () => void;
}

const Editor: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore } = useStore();

	const mapTitle: string = useMemo((): string => {
		return mapProps.get(menuStore.selectedMap).title;
	}, [menuStore.selectedMap]);

	const callbacks = {
		onFilesDrop: useCallback((files: File[]): void => {
			files[0].text().then((value: string): void => props.onFileDrop?.(files[0].name.split('.')[0], value));
			gaEvent("Editor", "Drop file", mapTitle);
		}, []),
		onDownload: useCallback((): void => {
			props.onDownload();
			gaEvent("Editor", "Download bank", mapTitle);
		}, [props.onDownload]),
		onCopy: useCallback((): void => {
			props.onCopy();
			gaEvent("Editor", "Copy code", mapTitle);
		}, [props.onCopy]),
		onReset: useCallback((): void => {
			props.onReset();
			gaEvent("Editor", "Reset", mapTitle);
		}, [props.onReset]),
	};

	const header: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Flex style={{ flexDirection: 'row' }}>
				<Flex style={{ flexDirection: 'column', width: '250px' }} alignInputs={true}>
					<Input label="BankName:" placeholder="BankFileName" onChange={props.onBankNameChange} tip="Bank filename without *.SC2Bank extension" value={props.bankName} />
					<Input label="Author id:" placeholder="X-SX-X-XXXXXXX" onChange={props.onAuthorIdChange} tip="Author ID from bank's path" value={props.authorID} />
				</Flex>
				<Drop onFilesDrop={callbacks.onFilesDrop} />
			</Flex>
		);
	}, [props.bankName, props.authorID]);

	const line: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Line style={{ margin: '10px 0 0 0' }} />
		);
	}, []);

	const buttons: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Button onClick={callbacks.onDownload}>Download bank</Button>
				<Button onClick={callbacks.onCopy}>Copy code</Button>
				<Button onClick={callbacks.onReset}>Reset</Button>
			</Flex>
		);
	}, [props.onDownload, props.onCopy]);

	return (
		<Flex style={{ flexDirection: 'column', padding: '10px', width: 'max-content', height: 'max-content', minWidth: 'max-content', minHeight: 'max-content' }}>
			{header}
			{line}
			{props.children}
			{line}
			{buttons}
		</Flex>
	);

});

export default React.memo(Editor);