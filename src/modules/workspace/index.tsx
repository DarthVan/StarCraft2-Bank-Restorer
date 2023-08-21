/* Generated with TypeScript React snippets */

import { mapProps } from '@src/components/maps/Maps';
import { Container, Glass } from '@src/components/ui';
import { useStore } from '@src/hooks/use-store';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';

/** Workspace **
* ...
* @Author Star Noob
* @Created 2022-09-30
*/

interface Props { }

const Workspace: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore } = useStore();

	// Заворачиваем формы в мутное стекло здесь, чтоб избавиться от лишнего рендера с блюром при редактировании
	const editors: JSX.Element[] | JSX.Element = useMemo((): JSX.Element[] | JSX.Element => {
		const mapData = mapProps.get(menuStore.selectedMap);
		return mapData?.forms ? mapData.forms.map((form: JSX.Element, index: number): JSX.Element => {
			return (<Glass key={index} border={true} style={{ minWidth: 'max-content', minHeight: 'max-content' }}>{form}</Glass>);
		}) : [];
	}, [menuStore.selectedMap]);

	return (
		<Container style={{ overflow: 'auto' }}>
			<Container style={{ flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-around' }}>
				{editors}
			</Container>
		</Container>
	);
});

export default React.memo(Workspace);