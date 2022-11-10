import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { createRoot, Root } from 'react-dom/client';
import './App.css';
import Slideshow from './components/ui/slideshow';
import { StoreProvider, useStore } from './hooks/use-store';
import Help from './modules/help';
import Info from './modules/info';
import Menu from './modules/menu';
import Workspace from './modules/workspace';
import { Modals } from './store/ModalStore';

const App: FC = observer((): JSX.Element => {
	const { modalStore } = useStore();

	return (
		<div className="App">
			<Menu />
			<Workspace />
			<Info />
			{modalStore.current == Modals.HELP && <Help />}
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