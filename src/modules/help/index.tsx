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
import { Modals } from 'src/store/ModalStore';

/** Help **
* ...
* @Author Star Noob
* @Created 2022-11-05
*/

interface Props {
	style?: CSSProperties;
}

const Help: FC<Props> = observer((props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal(Modals.NONE);
		}, [])
	};

	return (
		<Container style={{ flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
			<GlassWrapper border={true} >
				<Container style={{ overflow: 'auto', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: '650px', maxHeight: '850px' }} >

					<Container style={{ flexDirection: 'column', padding: '10px', minWidth: '100%', minHeight: 'max-content' }}>
						<Container style={{ flexDirection: 'row', justifyContent: 'space-between', height: 'min-content', minWidth: 'max-content' }}>
							<Label style={{ fontSize: '20px' }}>What is this?¿</Label>
							<Button onClick={callbacks.onCloseClick} >Close</Button>
						</Container>
						<Line style={{ margin: '10px 0 0 0' }} />

						<Container style={{ flexDirection: 'column', minWidth: '100%' }}>
							<Text>
								Hi!<br /><br />Reinstalled Windows? Playing Starcraft2 from another PC? Lost your save?<br />
								This service can restore some top-secured SC2 banks (Starcode + signature + anticheats).<br /><br />
							</Text >
							<Label>What bank can i restore here?</Label>
							<Text>
								All available cards can be selected in the menu selector. If your card is not there, then you can't :(<br /><br />
							</Text>
							<Label>I found my map, how to restore the bank?</Label>
							<Text>
								First make sure you have played this map and that the bank file folder exists.
								<b>Dont forget to make backup of your original bank file!!11</b><br />
								Some banks are verified with a signature that requires the player id and map author id to generate.
								They are in the path to the file:
							</Text>
							<img src="./assets/help.png" alt="help.png" width={629} height={191} />
							<Text>
								Usually the file name and author id are entered automatically, you don't need to change them unless you have to.
								<br />Just set other bank's options or drop your bank life to the rect "Drop file here" to read and edit it.
								<br />And pick 'Download bank' or 'Copy code'.<br /><br />
							</Text>
							<Label>Found a bug or wanna add new map?</Label>
							<Text>
								Post issues or pull requests <a href="https://github.com/DarthVan/StarCraft2-Bank-Restorer" target={'_blank'}>here</a>
								<br /><br />gg hf!<br /><br />
							</Text>
						</Container>
					</Container>

				</Container>
			</GlassWrapper>
		</Container>

	);
});

export default React.memo(Help);