/* Generated with TypeScript React snippets */

import { Container, Popup, Text } from '@src/components/ui';
import { useStore } from '@src/store/use-store';
import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';

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

	const list: { version: string, description: string }[] = modalStore.data.list;
	const lastVersioin: boolean = modalStore.data.lastVersion || false;

	return (
		<Popup label={'Updates'} onClose={callbacks.onCloseClick} minWidth={800} maxWidth={800} maxHeight={400}>

			<Text style={{
				textAlign: 'center',
				margin: '20px 20px 20px 0',
				color: lastVersioin ? '#22FF22' : '#FF2200',
				fontSize: '20px',
				textShadow: lastVersioin ? '0 0 5px #22FF22' : '0 0 5px #FF2222'
			}}>
				{modalStore.message}<br />
			</Text >

			<Container style={{ flexDirection: 'column' }}>
				<>
					{
						list.map((note: { version: string, description: string }, index: number): JSX.Element => {
							return (
								<Container key={index} style={{ flexDirection: 'column', width: '780px', minWidth: '780px', height: 'auto', marginBottom: '20px' }}>
									<Text style={{ textAlign: 'left', fontSize: '18px', textDecoration: 'underline', color: '#BBBBFF', fontWeight: '700' }}>{note.version}</Text>
									<Text style={{ textAlign: 'left', fontSize: '14px', whiteSpace: 'pre-wrap', tabSize: '4' }}>{note.description}</Text>
								</Container>
							);
						})
					}
					<div style={{ minHeight: '100px' }} />
				</>
			</Container>

		</Popup>
	);
});

export default React.memo(Updates);