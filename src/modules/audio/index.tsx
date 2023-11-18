/* Generated with TypeScript React snippets */

import { Button, Container } from '@src/components/ui';
import { Modals } from '@src/store/ModalStore';
import { useStore } from '@src/store/use-store';
import { gaEvent } from '@src/utils/ga4';
import { r } from '@src/utils/utils';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

/** AudioLoop **
* ...
* @Author Star Noob
* @Created 2023-03-10
*/

interface Props { }

const soundPath: string = 'assets/sound/';
const playlist: string[] = [
	'Motherchip & Malmen - A Thousand Sunflowers.mp3',
	'DDRKirby_ISQ - Across_the_Sky.mp3',
	'DDRKirby ISQ - Ghostly Maze.mp3',
	'ko0x - Galaxy Guppy.mp3',
	'DDRKirby ISQ - Winter Fox Spirit.mp3',
	'DDRKirby_ISQ - Balloon_Fighter_20XX.mp3',
	'DDRKirby(ISQ) - Underwater Aquarium.mp3',
	'DDRKirby(ISQ) - Starlight Festival.mp3',
	'Sugar flow.mp3',
	'DDRKirby_ISQ - Digital_Aliasing.mp3',
	'Xemogasa - sapphire eyes.mp3',
	'DDRKirby_ISQ - Dolphins.mp3',
	'Toni Leys - Through A Cardboard World.mp3',
	'laamaa - nuri brut.mp3',
	'DDRKirby_ISQ - Shining_in_the_Sky.mp3',
	'DDRKirby(ISQ) - Gentle Fluttering Spirit.mp3',
	'Funky Fish - Shadow of my Angel.mp3',
	'DDRKirby ISQ - Magma Mountain.mp3',
	'Vince Kaichan - the Zubmarine Zone.mp3',
	'DDRKirby ISQ - Spectre.mp3',
	'DDRKirby_ISQ - Song_of_the_Sea__WIP.mp3',
	'DDRKirby(ISQ) - Two Sketches Mix.mp3',
	'Kenet & Rez - Unreal Superhero 3.mp3',
	'DDRKirby_ISQ - Zion.mp3',
	'DDRKirby(ISQ) - Take to the Skies.mp3',
	'DDRKirby(ISQ) - A Life of Ecstasy.mp3',
	'DDRKirby ISQ - Take the Shot.mp3',
]; // 𝄞

const AudioLoop: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore, modalStore } = useStore();
	const audio: HTMLAudioElement = new Audio();
	const interactionType: string = 'mousedown';
	let volumeInterval: number = 0;
	let queue: string[] = [];

	audio.volume = 0;
	if (menuStore.sounds)
		audio.autoplay = true;

	const nextTrack: () => void = (function (): () => void {
		return (): void => {
			if (!queue.length)
				queue = [...playlist];

			const index: number = r(0, queue.length - 1);
			const track: string = queue.splice(index, 1)[0];

			audio.src = soundPath + track;
			audio.title = track;

			console.log('current playing:', audio.title, '\nqueue:', queue);
		};
	}());

	const volumeUp: () => void = (): void => {
		if (audio.volume > 0 || volumeInterval)
			return;

		volumeInterval = window.setInterval((): void => {
			audio.volume += 0.05;
			if (audio.volume > 0.80)
				window.clearInterval(volumeInterval);
		}, 500);
	};

	const onInteraction: () => void = (): void => {
		if (!menuStore.sounds || modalStore.current != Modals.NONE)
			return;

		nextTrack();
		audio.play();
		volumeUp();
		window.removeEventListener(interactionType, onInteraction);
	};

	const onTrackEnded: () => void = (): void => {
		gaEvent('Audio', 'Track Ended', (audio.muted ? '(Muted) ' : '') + audio.title);
		nextTrack();
		audio.play();
	};

	const callbacks = {
		onButtonClick: useCallback((): void => {
			if (menuStore.sounds) {
				audio.pause();
				gaEvent('Audio', 'Sound OFF', audio.title);
			} else {
				audio.play();
				volumeUp();
				gaEvent('Audio', 'Sound ON', audio.title);
			}
			menuStore.setSounds(!menuStore.sounds);
		}, [])
	};

	useEffect((): () => void => {
		audio.addEventListener('ended', onTrackEnded);
		window.addEventListener(interactionType, onInteraction);

		//nextTrack();
		return (): void => {
			audio.removeEventListener('ended', onTrackEnded);
			window.removeEventListener(interactionType, onInteraction);
			window.clearInterval(volumeInterval);
		}
	}, []);

	return (
		<Container style={{ width: '30px', height: '23px', padding: '0' }}>
			<Button
				onClick={callbacks.onButtonClick}
				style={{ width: '30px', color: menuStore.sounds ? '#FFFFFF' : '#FF0000' }}
			>♫♪</Button>
		</Container>
	);
});

export default React.memo(AudioLoop);