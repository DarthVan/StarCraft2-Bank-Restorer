import { MapStore } from './MapStore';
import { MenuStore } from './MenuStore';

export type RootStore = {
	menuStore: MenuStore;
	mapStore: MapStore;
}

const rootStore: RootStore = {
	menuStore: new MenuStore(),
	mapStore: new MapStore()
};

export default rootStore;