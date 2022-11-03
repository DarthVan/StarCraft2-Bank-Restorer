/* Generated with TypeScript snippets */

import ZombieCity from "./zombie-city";

/** Maps **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export enum Maps {

	RUNLING_RUN_4,
	RUNLING_RUN_8,
	ZOMBIE_CITY,
	STAR_CODE_LAB,

}

export const mapProps: Map<number, { title: string, authorID: string, forms: JSX.Element[] }> =
	new Map<number, { title: string, authorID: string, forms: JSX.Element[] }>([

		[Maps.RUNLING_RUN_4, {
			title: 'Runling Run 4',
			authorID: '2-S2-1-3564862 - RunlingRun004',
			forms: [<ZombieCity />, <></>]
		}],

		[Maps.RUNLING_RUN_8, {
			title: 'Runling Run 8',
			authorID: '???',
			forms: [<></>, <></>, <></>, <></>]
		}],

		[Maps.ZOMBIE_CITY, {
			title: 'Zombie City',
			authorID: '2-S2-1-1687296',
			forms: [<ZombieCity bankName="AMMMAAKDAS39349" />]
		}],

		[Maps.STAR_CODE_LAB, {
			title: 'Star Code Lab (PRO only)',
			authorID: '',
			forms: [<></>]
		}]

	]);