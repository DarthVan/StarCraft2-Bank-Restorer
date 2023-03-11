/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Flex from '../../components/ui/container';
import GlassWrapper from '../../components/ui/glass-wrapper';
import Label from '../../components/ui/label';

/** Info **
* ...
* @Author Star Noob
* @Created 2022-04-28
*/

interface Props {

}

const Info: FC<Props> = observer((): JSX.Element => {
	const { modalStore } = useStore();
	const version: string = '1.01'; // todo: store this here?

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

				if (list[0].version != version) {
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
		const interval: number = setInterval((): void => loadUpdatesList(), 60000);
		return (): void => clearInterval(interval);
	}, []);

	const callbacks = {
		onVersionClick: useCallback((): void => {
			loadUpdatesList(true);
		}, [])
	};

	return (
		<GlassWrapper>
			<Flex style={{ overflow: 'auto' }}>
				<Flex style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', minWidth: 'max-content' }}>
					<Label>Powered by React 18</Label>
					<div onClick={callbacks.onVersionClick} style={{ cursor: 'pointer' }}>
						<Text style={{ textDecoration: 'underline', fontSize: '12px' }}>Version {version}</Text>
					</div>
				</Flex>
			</Flex>
		</GlassWrapper>
	);
});

export default React.memo(Info);