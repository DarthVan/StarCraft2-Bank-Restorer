/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';
import Label from 'src/components/ui/label';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Popup from '../popup';

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
			modalStore.setModal('NONE');
		}, [])
	};

	return (
		<Popup label={'What is this?¿'} maxWidth={900} minWidth={900} maxHeight={600} onClose={callbacks.onCloseClick}>
			<Text>
				Hi!<br /><br />Reinstalled Windows? Playing Starcraft2 from another PC? Lost your save?<br />
				This service can restore some top-secured SC2 banks (Starcode + signature + anticheats).<br /><br />
			</Text >
			<Label>1. What bank can be restored here?</Label>
			<Text>
				All available maps can be selected in the menu selector. If your map is not there, then you can't :(<br /><br />
			</Text>
			<Label>2. I found my map, how to restore the bank?</Label>
			<Text>
				First make sure you have played this map and that the bank file folder exists.
				You don't have to be in the game, be offline, or go to the menu.
				Otherwise the game will overwrite the bank and you will not see any changes.
				<b> Dont forget to make backup of your original bank file!!11</b><br />
				Some banks are verified with a signature that requires the player id and map author id to generate.
				They are in the path to the file:<br /><br /><br />
			</Text>
			<img src="./assets/help.png" alt="help.png" width={629} height={191} style={{ alignSelf: 'center' }} />
			<Text style={{ alignSelf: 'center' }}>Variables for Generator<br /><br /><br /></Text>
			<Text>
				Usually the file name and author id are entered automatically, you don't need to change them unless you have to.
				<br />Just set other bank's options or drop your bank file to the rect "Drop file here" to read and edit it.
				<br />And pick 'Download bank' or 'Copy code'.<br /><br />
			</Text>
			<Label>Found a bug or wanna add new map?</Label>
			<Text>
				Post issues or pull requests <a href="https://github.com/DarthVan/StarCraft2-Bank-Restorer" target={'_blank'}>here</a>
				<br /><br />gg hf!<br /><br />
			</Text>
		</Popup>
	);
});

export default React.memo(Help);