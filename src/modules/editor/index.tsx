/* Generated with TypeScript React snippets */

import React, { FC, useCallback, useMemo } from 'react';
import Button from 'src/components/ui/button';
import Flex from 'src/components/ui/container';
import Drop from 'src/components/ui/drop';
import Input from 'src/components/ui/input';
import Line from 'src/components/ui/line';

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

const Editor: FC<Props> = (props: Props): JSX.Element => {

	const onFilesDrop: (files: File[]) => void = useCallback((files: File[]): void => {
		files[0].text().then((value: string): void => props.onFileDrop?.(files[0].name.split('.')[0], value));
	}, []);

	const header: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Flex style={{ flexDirection: 'row' }}>
				<Flex style={{ flexDirection: 'column', width: 'min-content' }} alignInputs={true}>
					<Input label="BankName:" placeholder="BankFileName" onChange={props.onBankNameChange} tip="Bank filename without *.SC2Bank extension" value={props.bankName} />
					<Input label="Author id:" placeholder="X-SX-X-XXXXXXX" onChange={props.onAuthorIdChange} tip="Author ID from bank's path" value={props.authorID} />
				</Flex>
				<Drop onFilesDrop={onFilesDrop} />
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
				<Button onClick={props.onDownload}>Download bank</Button>
				<Button onClick={props.onCopy}>Copy code</Button>
				<Button onClick={props.onReset}>Reset</Button>
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

}

export default React.memo(Editor);