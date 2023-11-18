/* Generated with TypeScript React snippets */

import { Popup, Text } from '@src/components/ui';
import { useStore } from '@src/store/use-store';
import { observer } from 'mobx-react-lite';
import React, { CSSProperties, FC, useCallback } from 'react';

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