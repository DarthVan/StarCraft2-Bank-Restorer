import { useLocalObservable } from 'mobx-react-lite';
import React, { Context } from 'react';
import rootStore, { RootStore } from '.';

const storeContext: Context<RootStore> = React.createContext<RootStore | null>(null);

export const StoreProvider: ({ children }: { children: React.ReactNode }) => JSX.Element = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const store: RootStore = useLocalObservable((): RootStore => rootStore);
	return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
}

export const useStore: () => RootStore = (): RootStore => {
	const store: RootStore = React.useContext(storeContext);
	if (!store)
		throw new Error('useStore must be used within a StoreProvider.');
	return store;
}