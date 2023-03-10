/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';
import Text from 'src/components/ui/text';
import { useStore } from 'src/hooks/use-store';
import Popup from '../../components/ui/popup';

/** Warn **
* ...
* @Author Star Noob
* @Created 2022-11-05
*/

interface Props {
	style?: CSSProperties;
}

const Warn: FC<Props> = observer((props: Props): JSX.Element => {
	const { modalStore } = useStore();

	const callbacks = {
		onCloseClick: useCallback((): void => {
			modalStore.setModal('NONE');
		}, [])
	};

	return (
		<Popup label={'Warning'} onClose={callbacks.onCloseClick}>
			<Text style={{ textAlign: 'center', marginTop: '20px' }}>
				{modalStore.message}
			</Text >
		</Popup>
	);
});

export default React.memo(Warn);