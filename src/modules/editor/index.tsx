/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import Button from 'src/components/ui/button';
import Flex from 'src/components/ui/container';
import Drop from 'src/components/ui/drop';
import GlassWrapper from 'src/components/ui/glass-wrapper';
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
	onFileDrop?: (value: string) => void;
	onBankNameChange?: (value: string) => void;
	onAuthorIdChange?: (value: string) => void;
	onDownload?: () => void;
	onCopy?: () => void;
	onReset?: () => void;
}

const Editor: FC<Props> = observer((props: Props): JSX.Element => {
	const callbacks = {
		onBankNameChange: useCallback((value: string): void => {
			props.onBankNameChange?.(value);
		}, []),
		onAuthorIdChange: useCallback((value: string): void => {
			props.onAuthorIdChange?.(value);
		}, []),
		onFilesDrop: useCallback((files: File[]): void => {
			files[0].text().then((value: string): void => { props.onFileDrop?.(value); });
		}, [props]),
		onDownloadClick: useCallback((): void => {
			props.onDownload?.();
		}, [props]),
		onCopyCodeClick: useCallback((): void => {
			props.onCopy?.();
		}, [props]),
		onResetClick: useCallback((): void => {
			props.onReset?.();
		}, [props])
	}

	return (
		<GlassWrapper border={true} style={{ minWidth: 'max-content', minHeight: 'max-content' }}>
			<Flex style={{ flexDirection: 'column', padding: '10px', width: 'max-content', height: 'max-content', minWidth: 'max-content', minHeight: 'max-content' }}>

				<Flex style={{ flexDirection: 'row' }}>
					<Flex style={{ flexDirection: 'column', width: 'min-content' }} alignInputs={true}>
						<Input label="BankName:" placeholder="BankFileName" onChange={callbacks.onBankNameChange} tip="Bank filename without *.SC2Bank extension" value={props.bankName} />
						<Input label="Author id:" placeholder="X-SX-X-XXXXXXX" onChange={callbacks.onAuthorIdChange} tip="Author ID from bank's path" value={props.authorID} />
					</Flex>
					<Drop onFilesDrop={callbacks.onFilesDrop} />
				</Flex>

				<Line style={{ margin: '10px 0 0 0' }} />
				{props.children}
				<Line style={{ margin: '10px 0 0 0' }} />

				<Flex style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Button onClick={callbacks.onDownloadClick}>Download bank</Button>
					<Button onClick={callbacks.onCopyCodeClick}>Copy code</Button>
					<Button onClick={callbacks.onResetClick}>Reset</Button>
				</Flex>

			</Flex>
		</GlassWrapper>
	);
})

export default React.memo(Editor);