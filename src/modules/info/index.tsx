/* Generated with TypeScript React snippets */

import { APP_VERSION, CHECK_UPDATES_DELAY } from '@src/Globals';
import { Container, Glass, Label, Text } from '@src/components/ui';
import { useStore } from '@src/hooks/use-store';
import { gaEvent } from '@src/utils/ga4';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

/** Info **
* ...
* @Author Star Noob
* @Created 2022-04-28
*/

interface Props {

}

const Info: FC<Props> = observer((): JSX.Element => {
	const { modalStore } = useStore();

	const loadUpdatesList: (forceShow?: boolean) => void = (forceShow?: boolean): void => {
		console.log('Checking updates...');
		fetch('./updates.json' + '?' + Date.now(), { cache: 'no-cache' })
			.then(
				(response: Response): Promise<any> => response.json(),
				(): void => console.error('Info: cant load updates list!'))
			.then((json: any): void => { //console.log(json.updates)
				const list: { version: string, description: string }[] = json.updates;
				if (!list || !list.length) {
					console.error('Info: updates list is null or empty');
					return;
				}

				if (list[0].version != APP_VERSION) {
					modalStore.setModal('UPDATES', 'There is a new update! Refresh your tab.', null, list);
					return;
				}

				if (forceShow) {
					modalStore.setModal('UPDATES', 'Your tab is up to date!', null, list);
				}

				/* for (let i: number = 0; i < list.length; i++)
					console.log('update ' + list[i].version + ': ' + list[i].description); */
			});
	}

	useEffect((): () => void => {
		loadUpdatesList(); // first auto check
		const interval: number = window.setInterval((): void => loadUpdatesList(), CHECK_UPDATES_DELAY); // 10 mins
		return (): void => window.clearInterval(interval);
	}, []);

	const callbacks = {
		onVersionClick: useCallback((): void => {
			loadUpdatesList(true);
			gaEvent('Info', 'Version', APP_VERSION);
		}, [])
	};

	return (
		<Glass>
			<Container style={{ overflow: 'auto' }}>
				<Container style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', minWidth: 'max-content' }}>
					<Label>Powered by React 18</Label>
					<div onClick={callbacks.onVersionClick} style={{ cursor: 'pointer' }}>
						<Text style={{ textDecoration: 'underline', fontSize: '12px' }}>Version {APP_VERSION}</Text>
					</div>
				</Container>
			</Container>
		</Glass>
	);
});

export default React.memo(Info);