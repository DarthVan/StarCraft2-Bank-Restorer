/* Generated with TypeScript React snippets */

import { Container, Popup, Text } from '@src/components/ui';
import { useStore } from '@src/hooks/use-store';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

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
					list.map((note: { version: string, description: string }, index: number): JSX.Element => {
						return (
							<Container key={index} style={{ flexDirection: 'column', width: '780px', minWidth: '780px', height: 'auto', marginBottom: '20px' }}>
								<Text style={{ textAlign: 'left', fontSize: '20px', textDecoration: 'underline' }}>{note.version}</Text>
								<Text style={{ textAlign: 'left', fontSize: '14px', whiteSpace: 'pre-wrap', tabSize: '4' }}>{note.description}</Text>
							</Container>
						);
					})
				}
			</Container>

		</Popup>
	);
});

export default React.memo(Updates);