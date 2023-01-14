/* Generated with TypeScript React snippets */

import React, { FC, useCallback } from 'react';
import Button from 'src/components/ui/button';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Popup from '../popup';

/** Accounts **
* ...
* @Author Star Noob
* @Created 2023-01-13
*/

interface Props {
	onChange?: (value: string) => void;
}

const Accounts: FC<Props> = (props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal('NONE');
		}, []),
		onAddNewAccount: useCallback((): void => {
			console.log('add new account!');
		}, []),
	};

	return (
		<Popup label={'Accounts'} minWidth={500} maxWidth={900} maxHeight={400} onClose={callbacks.onCloseClick}>
			<Text style={{ textAlign: 'center', marginTop: '10px' }}>
				If you have more accounts, u can add them here for quick swithcing. <br /><br />
			</Text >
			<Button style={{ width: '200px', alignSelf: 'center' }} onClick={callbacks.onAddNewAccount}>Add new account</Button>
		</Popup>
	);
}

export default React.memo(Accounts);