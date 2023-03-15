/* Generated with TypeScript React snippets */

import React, { FC, useEffect, useRef } from 'react';
import { r } from 'src/utils/utils';
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
		n = type == 'random' ? r(1, 3) : n > 3 ? 1 : n + 1;
		ref.current.style.backgroundImage = "url('./assets/pics/bg" + n + ".jpg')";
		return n;
	};

	const interval: number = setInterval((): void => {
		n = nextBG(n, ref, type);
	}, 120000);

	window.onbeforeunload = (): void => {
		clearInterval(interval);
	}

	useEffect((): void => { n = nextBG(n, ref, type) }, []);

	return (
		<div className='Slideshow' ref={ref}>
			{props.children}
		</div>
	);
}

export default React.memo(Slideshow);