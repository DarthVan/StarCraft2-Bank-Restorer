import React, { FC } from 'react';
import { createRoot, Root } from 'react-dom/client';
import './App.css';
import Slideshow from './components/ui/slideshow';
import { StoreProvider } from './hooks/use-store';
import Info from './modules/info';
import Menu from './modules/menu';
import Workspace from './modules/workspace';

const App: FC = (): JSX.Element => {
	return (
		<Slideshow type='random'>
			<StoreProvider>
				<div className="App">
					<Menu />
					<Workspace />
					<Info />
				</div>
			</StoreProvider >
		</Slideshow>
	);
};

const root: Root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);