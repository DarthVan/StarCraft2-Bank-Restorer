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
	const type: 'random' | 'queue' = props.type || 'random';

	const ref1: React.MutableRefObject<HTMLDivElement> = useRef<null | HTMLDivElement>(null);
	const ref2: React.MutableRefObject<HTMLDivElement> = useRef<null | HTMLDivElement>(null);

	let tick: boolean = true;
	let n: number = 0;

	const nextBG: () => void = (): void => {
		n = type == 'queue' ? n >= TOTAL_BG_PICTURES ? 1 : n + 1 : r(1, TOTAL_BG_PICTURES);
		tick = !tick;

		//console.log(tick);

		if (tick) {
			ref1.current.style.backgroundImage = `url('./assets/images/backgrounds/bg${n}.jpg')`;
			setTimeout((): void => { // need some time to load picture
				ref1.current.style.opacity = '1';
				ref2.current.style.opacity = '0';
			}, 3000);
		} else {
			ref2.current.style.backgroundImage = `url('./assets/images/backgrounds/bg${n}.jpg')`;
			setTimeout((): void => { // need some time to load picture
				ref2.current.style.opacity = '1';
				ref1.current.style.opacity = '0';
			}, 3000);
		}
	};

	useEffect((): () => void => {
		if (!ref1.current || !ref2.current)
			return null;

		nextBG();

		const interval: number = window.setInterval((): void => {
			nextBG();
		}, CHANGE_BG_DELAY);

		return (): void => {
			window.clearInterval(interval);
		};
	}, []);

	return (
		<>
			<div key='1' className='Slideshow' ref={ref1} />
			<div key='2' className='Slideshow' ref={ref2} />
			{props.children}
		</>
	);
};

export default React.memo(Slideshow);