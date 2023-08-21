import AccountStore from './AccountStore';
import MapStore from './MapStore';
import MenuStore from './MenuStore';
import ModalStore from './ModalStore';

export type RootStore = {
	accountStore: AccountStore,
	mapStore: MapStore;
	menuStore: MenuStore;
	modalStore: ModalStore;
}

const rootStore: RootStore = {
	accountStore: new AccountStore(),
	mapStore: new MapStore(),
	menuStore: new MenuStore(),
	modalStore: new ModalStore()
};

export default rootStore;