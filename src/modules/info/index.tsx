/* Generated with TypeScript React snippets */

import React, { FC } from 'react';
import Flex from '../../components/ui/container';
import GlassWrapper from '../../components/ui/glass-wrapper';
import Label from '../../components/ui/label';

/** Info **
* ...
* @Author Star Noob
* @Created 2022-04-28
*/

interface Props {

}

const Info: FC<Props> = (): JSX.Element => {
	return (
		<GlassWrapper>
			<Flex style={{ overflow: 'auto' }}>
				<Flex style={{ justifyContent: 'center', alignItems: 'center', padding: '20px', minWidth: 'max-content' }}>
					<Label>Powered by React 18</Label>
				</Flex>
			</Flex>
		</GlassWrapper>
	);
}

export default React.memo(Info);