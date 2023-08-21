/* Generated with TypeScript React snippets */

import { CHANGE_BG_DELAY, TOTAL_BG_PICTURES } from '@src/Globals';
import { r } from '@src/utils/utils';
import React, { FC, useEffect, useRef } from 'react';
import './style.css';

/** Slideshow **
* ...
* @Author Star Noob
* @Created 2022-10-27
*/

interface Props {
	children?: JSX.Element | JSX.Element[];
	type?: 'random' | 'queue';
}

const Slideshow: FC<Props> = (props: Props): JSX.Element => {
	const ref = useRef<null | HTMLDivElement>(null);
	let { type } = props;
	if (!type)
		type = 'random';

	let n: number = 0;
	const nextBG: (n: number, ref: any, type: string) => number = (n: number, ref: any, type: string): number => {
		n = type == 'random' ? r(1, TOTAL_BG_PICTURES) : n > TOTAL_BG_PICTURES ? 1 : n + 1;
		ref.current.style.backgroundImage = "url('./assets/images/backgrounds/bg" + n + ".jpg')";
		return n;
	};

	useEffect((): () => void => {
		n = nextBG(n, ref, type);
		const interval: number = window.setInterval((): void => {
			n = nextBG(n, ref, type);
		}, CHANGE_BG_DELAY); // 10 mins
		return (): void => window.clearInterval(interval);
	}, []);

	return (
		<div className='Slideshow' ref={ref}>
			{props.children}
		</div>
	);
}

export default React.memo(Slideshow);