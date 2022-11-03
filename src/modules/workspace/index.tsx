/* Generated with TypeScript React snippets */

import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { mapProps } from "src/components/maps/Maps";
import Flex from 'src/components/ui/container';
import { useStore } from 'src/hooks/use-store';

/** Workspace **
* ...
* @Author Star Noob
* @Created 2022-09-30
*/

interface Props {

}

const Workspace: FC<Props> = observer((props: Props): JSX.Element => {
	const { menuStore } = useStore();

	// Сдозаем редакторы
	const editors: JSX.Element[] | JSX.Element = useMemo((): JSX.Element[] | JSX.Element => {
		const result: JSX.Element[] | JSX.Element = [];
		const mapData = mapProps.get(menuStore.selectedMap);

		mapData.forms.forEach((form: JSX.Element, index: number): void => {
			result.push(form);
		});

		return result;
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