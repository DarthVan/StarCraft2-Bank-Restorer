/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';
import Button from 'src/components/ui/button';
import Container from 'src/components/ui/container';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Popup from '../../components/ui/popup';

/** Confirm **
* ...
* @Author Star Noob
* @Created 2023-02-03
*/

interface Props {
	style?: CSSProperties;
}

const Confirm: FC<Props> = observer((props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal('NONE');
		}, []),
		onYesClick: useCallback((): void => {
			modalStore.actions[0]?.(); // action [0] - yes
			modalStore.setModal('NONE');
		}, []),
		onNoClick: useCallback((): void => {
			modalStore.actions[1]?.(); // action [1] - no
			modalStore.setModal('NONE');
		}, [])
	};

	return (
		<Popup label={'?¿'} onClose={callbacks.onCloseClick} maxWidth={500} minWidth={500} maxHeight={200}>

			<Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '500px', minWidth: '500px' }}>

				<Text style={{ textAlign: 'center', marginTop: '20px', marginRight: '20px' }}>
					{modalStore.message}
				</Text >

				<Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
					<Button onClick={callbacks.onYesClick} style={{ width: '100px', minWidth: '100px' }}>Yes</Button>
					<Button onClick={callbacks.onNoClick} style={{ width: '100px', minWidth: '100px' }}>No</Button>
				</Container>

			</Container>

		</Popup>
	);
});

export default React.memo(Confirm);