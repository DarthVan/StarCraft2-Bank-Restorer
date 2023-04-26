/* Generated with TypeScript React snippets */

import React, { FC, useMemo } from 'react';
import Button from 'src/components/ui/button';
import Container from 'src/components/ui/container';
import GlassWrapper from 'src/components/ui/glass-wrapper';
import Label from 'src/components/ui/label';
import Line from 'src/components/ui/line';

/** Popup **
* ...
* @Author Star Noob
* @Created 2023-01-13
*/

interface Props {
	onClose?: () => void;
	children?: JSX.Element[] | JSX.Element;
	label?: string;
	minWidth?: number;
	maxWidth?: number;
	//minHeight?: number;
	maxHeight?: number;
}

const Popup: FC<Props> = (props: Props): JSX.Element => {
	const minWidth: string = (props.minWidth || 250) + 'px';
	const maxWidth: string = (props.maxWidth || 500) + 'px';
	//const minHeight: string = (props.minHeight || 100) + 'px';
	const maxHeight: string = (props.maxHeight || 200) + 'px';

	const header: JSX.Element = useMemo((): JSX.Element => {
		return (
			<Container style={{ flexDirection: 'column', padding: '10px', height: 'min-content' }}>
				<Container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Label style={{ fontSize: '20px' }}>{props.label}</Label>
					<Button onClick={props.onClose} >Close</Button>
				</Container>
				<Line style={{ margin: '10px 0 0 0' }} />
			</Container>
		);
	}, []);

	return (
		<Container style={{ flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
			<GlassWrapper border={true} >
				<>
					{header}

					<Container style={{
						overflowX: 'auto',
						flexDirection: 'column',
						width: 'calc(100vw - 40px)',
						maxWidth,
						height: 'calc(100vh - 80px)',
						maxHeight,
						minWidth: '100%',
						minHeight: 'max-content'
					}}>

						<Container style={{ flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', padding: '0 0 10px 10px', minWidth }}>
							{props.children}
						</Container>

					</Container>
				</>
			</GlassWrapper>
		</Container>
	);
}

export default React.memo(Popup);