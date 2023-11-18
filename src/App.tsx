/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { Slides } from '@src/components/ui';
import { Accounts, Confirm, Help, Info, Menu, Updates, Warn, Workspace } from '@src/modules';
import { Modals } from '@src/store/ModalStore';
import { StoreProvider, useStore } from '@src/store/use-store';
import { gaInit } from '@src/utils/ga4';
import './App.css';

/** App **
* ...
* @Author Star Noob
* @Created 2023-02-08
*/

const App: FC = observer((): JSX.Element => {
	const { modalStore } = useStore();

	useEffect((): void => {
		gaInit();
	}, []);

	return (
		<div className='App'>
			<Menu />
			<Workspace />
			<Info />
			{modalStore.current == Modals.HELP && <Help />}
			{modalStore.current == Modals.WARN && <Warn />}
			{modalStore.current == Modals.ACCOUNTS && <Accounts />}
			{modalStore.current == Modals.CONFIRM && <Confirm />}
			{modalStore.current == Modals.UPDATES && <Updates />}
		</div>
	);
});

const root: Root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Slides type='random'>
			<StoreProvider>
				<App />
			</StoreProvider >
		</Slides >
	</React.StrictMode >
);