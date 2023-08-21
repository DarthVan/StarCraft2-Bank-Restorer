import { configure } from "mobx";
import { useLocalObservable } from 'mobx-react-lite';
import React, { Context } from 'react';
import rootStore, { RootStore } from '../store';

// Настройка mobX, добавляем капельку асинхронности, чтоб обрабытвать пачку синхронных измений за 1 раз
// такое делали до 18 реакта, хз имеет ли смысл теперь, батчинг есть из коробки
/* const configureMobX: () => void = (): void => {
	setTimeout((): void => {
		configure({
			reactionScheduler: (f: () => void): void => {
				setTimeout(f);
			},
		});
	}, 100);
};
configureMobX(); */
/* configure({
	enforceActions: 'never', // Этот параметр отключает проверку изменений только в экшенах
	disableErrorBoundaries: true, // Этот параметр отключает ошибки внутри MobX-объектов
	reactionRequiresObservable: false, // Этот параметр отключает проверку наблюдаемости для реакций
}); */

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

/* import React from "react";
import { stores, storesContext } from "src/storeOld/store";

export const useStores = () => React.useContext(storesContext);

// эдакое отипизирование и оключивание обджекта, но смысл в том, что из общего типа stores {st1:{}, st2:{}}
// тут будут собраны только ключи этого типа: "st1" | "st2",
// соответственно, передав в качестве параметра стрингу, получим значение по ней - соотв стор.
export const useStore = <T extends keyof typeof stores>(
	store: T
): typeof stores[T] => React.useContext(storesContext)[store]; */