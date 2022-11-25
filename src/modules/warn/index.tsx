/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';
import Button from 'src/components/ui/button';
import Container from 'src/components/ui/container';
import GlassWrapper from 'src/components/ui/glass-wrapper';
import Label from 'src/components/ui/label';
import Line from 'src/components/ui/line';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';

/** Warn **
* ...
* @Author Star Noob
* @Created 2022-11-05
*/

interface Props {
	style?: CSSProperties;
}

const Warn: FC<Props> = observer((props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal('NONE');
		}, [])
	};

	return (
		<Container style={{ flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
			<GlassWrapper border={true} >
				<Container style={{ overflow: 'auto', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: '500px', maxHeight: '200px' }} >

					<Container style={{ flexDirection: 'column', padding: '10px', minWidth: '100%', minHeight: 'max-content' }}>
						<Container style={{ flexDirection: 'row', justifyContent: 'space-between', height: 'min-content', minWidth: 'max-content' }}>
							<Label style={{ fontSize: '20px' }}>Warning</Label>
							<Button onClick={callbacks.onCloseClick} >Close</Button>
						</Container>
						<Line style={{ margin: '10px 0 0 0' }} />

						<Container style={{ flexDirection: 'column', minWidth: '100%', justifyContent: 'center' }}>
							<Text style={{ textAlign: 'center', marginTop: '-20px' }}>
								{modalStore.message}
							</Text >
						</Container>
					</Container>

				</Container>
			</GlassWrapper>
		</Container>

	);
});

export default React.memo(Warn);