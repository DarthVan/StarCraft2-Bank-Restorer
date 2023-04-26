/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';
import Container from 'src/components/ui/container';
import Label from 'src/components/ui/label';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Popup from '../../components/ui/popup';

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
		<Popup label={'What is this?¿'} maxWidth={1200} minWidth={700} maxHeight={600} onClose={callbacks.onCloseClick}>
			<Container style={{ flexDirection: 'column', padding: '20px', minWidth: '100%' }}>
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
					First make sure you have played this map and that the bank file folder exists.<br />
					StarCraft2 stores banks (save files) in C:/Users/UserName/Documents/StarCraft II/Accounts/.../.../Banks/... . You have to find the bank file there.
					When you select map here, you also can copy bank fileName to use it in search:<br /><br />
				</Text>
				<img src="./assets/images/help1.png" alt="help1.png" width={281} height={52} style={{ alignSelf: 'center', border: '3px double #ffffff40' }} />
				<Text style={{ alignSelf: 'center' }}>Bank file name for search (Example for map "Zombie World Unity")<br /><br /></Text>
				<Text style={{ alignSelf: 'center' }}><b> Dont forget to make backup of your original bank file!</b><br /><br /><br /></Text>

				<Label>3. Found the bank file, what next?</Label>
				<Text>
					Most of banks are verified with a signature that requires the playerID and map authorID to generate.
					They are in the path to the file:<br /><br />
				</Text>
				<img src="./assets/images/help2.png" alt="help2.png" width={629} height={191} style={{ alignSelf: 'center', border: '3px double #ffffff40' }} />
				<Text style={{ alignSelf: 'center' }}>Variables for Generator<br /><br /><br /></Text>
				<Text>
					Usually the file name and author id are entered automatically, you don't need to change them unless you have to.
					But some regions (NA, Asian) can have different autor IDs, so u have to be sure that autorID in the editor is correct.<br /><br />
				</Text>
				<img src="./assets/images/help3.png" alt="help3.png" width={700} height={240} style={{ alignSelf: 'center', border: '3px double #ffffff40' }} />
				<Text style={{ alignSelf: 'center' }}>Where to put IDs<br /><br /><br /></Text>

				<Label>4. Edit your stats</Label>
				<Text>
					Now you enter any values for new stats, or drop your bank file to the rect "Drop file here" to read and edit it.<br />
					Please note that not all file parameters will be read when you drop the bank, but only the most important.<br /><br /><br />
				</Text>

				<Label>5. Replace or update the bank file</Label>
				<Text>
					You don't have to be in the game, be offline, or go to the main menu. Otherwise the game will overwrite the bank and you will not see any changes.<br /><br />
					Click <b>Download bank</b> or <b>Copy code</b> to copy the contents of a bank file to clipboard.<br /><br />
					If you have downloaded the file several times, then the file names can be like <b>myBank</b>, <b>myBank(1)</b>, <b>myBank(2)</b>...
					In this case, rename the desired file to remove the numbers and the file name was the same as the original bank file.<br /><br />
					Or you can copy the contents to the clipboard, open the bank file in any text editor and do <b>Ctrl + A</b> (select all), <b>Ctrl + V</b> (paste), <b>Ctrl + S</b> (save) there. So you don't have to deal with downloaded files.<br /><br /><br />
				</Text>

				<Label>Can I get banned for this?</Label>
				<Text>
					No, custom maps are not official, they are created by other players with different skills, they can have various bugs, exploits, and other things that players can use.
					Blizzard is not responsible for this and does not take any action for these cases.<br /><br />
					In addition, it is well known that player statistics are sometimes reset/change spontaneously due to bugs in progress saving algorithms.<br /><br /><br />
				</Text>

				<Label>Whats "Accounts" for?</Label>
				<Text>
					The account manager is intended for those who have multiple accounts and are going to make stats for each one. Nicknames can be anything for convenience, and the player id is substituted from the path to the banks folder, as in paragraph 3.<br /><br />
					A separate pool of maps will be created for each account and stored in the browser cache, so you can switch between entries and not enter PlayerID and stats every time.<br /><br /><br />
				</Text>

				<Label>Whats "Auto Save" for?</Label>
				<Text>
					This option is just to save the current bank's stats in the cache.<br />
					If it is active, then saving occurs every time you change any value or option.<br />
					If disabled, the stats is saved only when downloading or copying a bank file.<br /><br /><br />
				</Text>

				<Label>Found a bug or wanna add new map?</Label>
				<Text>
					Post issues or pull requests <a href="https://github.com/DarthVan/StarCraft2-Bank-Restorer" target={'_blank'}>here</a>
					<br /><br />gg hf!<br /><br />
				</Text>
			</Container>
		</Popup>
	);
});

export default React.memo(Help);