/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { mapProps } from "src/components/maps/Maps";
import Flex from 'src/components/ui/container';
import GlassWrapper from 'src/components/ui/glass-wrapper';
import { useStore } from 'src/hooks/use-store';

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
		return mapData?.forms ? mapData.forms.map((form: JSX.Element): JSX.Element => {
			return (<GlassWrapper border={true} style={{ minWidth: 'max-content', minHeight: 'max-content' }}>{form}</GlassWrapper>);
		}) : [];
	}, [menuStore.selectedMap]);

	return (
		<Flex style={{ overflow: 'auto' }}>
			<Flex style={{ flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-around' }}>
				{editors}
			</Flex>
		</Flex>
	);
});

export default React.memo(Workspace);