/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { createRoot, Root } from 'react-dom/client';
import ReactGA from "react-ga4";
import './App.css';
import Slideshow from './components/ui/slideshow';
import { StoreProvider, useStore } from './hooks/use-store';
import Accounts from './modules/accounts';
import Confirm from './modules/confirm';
import Help from './modules/help';
import Info from './modules/info';
import Menu from './modules/menu';
import Updates from './modules/updates';
import Warn from './modules/warn';
import Workspace from './modules/workspace';
import { Modals } from './store/ModalStore';

/** App **
* ...
* @Author Star Noob
* @Created 2023-02-08
*/

const App: FC = observer((): JSX.Element => {
	const { modalStore } = useStore();

	ReactGA.initialize("G-F9Y8FZ0KFE", {
		gtagOptions: {
			cookie_flags: 'max-age=7200;Secure=true;SameSite=none'
		},
		gaOptions: { cookieDomain: 'none' }
	});

	return (
		<div className="App">
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
		<Slideshow type='random'>
			<StoreProvider>
				<App />
			</StoreProvider >
		</Slideshow >
	</React.StrictMode >
);