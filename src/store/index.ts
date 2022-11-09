import { MapStore } from './MapStore';
import { MenuStore } from './MenuStore';
import { ModalStore } from './ModalStore';

export type RootStore = {
	mapStore: MapStore;
	menuStore: MenuStore;
	modalStore: ModalStore;
}

const rootStore: RootStore = {
	mapStore: new MapStore(),
	menuStore: new MenuStore(),
	modalStore: new ModalStore()
};

export default rootStore;