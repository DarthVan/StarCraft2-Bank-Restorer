/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import Container from 'src/components/ui/container';
import Popup from 'src/components/ui/popup';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';

/** VersionChecker **
* ...
* @Author Star Noob
* @Created 2023-03-11
*/

interface Props {
}

const Updates: FC<Props> = observer((props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal('NONE');
		}, [])
	};

	const list: { version: string, description: string }[] = modalStore.data;

	return (
		<Popup label={'Updates'} onClose={callbacks.onCloseClick} minWidth={800} maxWidth={800} maxHeight={400}>

			<Text style={{ textAlign: 'center', marginTop: '20px', marginRight: '20px', marginBottom: '20px' }}>
				{modalStore.message}<br />
			</Text >

			<Container style={{ flexDirection: 'column' }}>
				{
					list.map((note: { version: string, description: string }): JSX.Element => {
						return (
							<Container style={{ flexDirection: 'column', width: '780px', minWidth: '780px', height: 'auto', marginBottom: '20px' }}>
								<Text style={{ textAlign: 'left', fontSize: '20px', textDecoration: 'underline' }}>{note.version}</Text>
								<Text style={{ textAlign: 'left', fontSize: '14px' }}>{note.description}</Text>
							</Container>
						);
					})
				}
			</Container>

		</Popup>
	);
});

export default React.memo(Updates);