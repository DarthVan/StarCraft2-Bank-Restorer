/* Generated with TypeScript snippets */

import Editor from "src/modules/editor";
import AnySimple from "./any-simple";
import RunlingRun4 from "./runling-run-4";
import RunlingRun8ilovePie from "./runling-run-8/i-love-pie";
import RunlingRun8Prestige from "./runling-run-8/prestige";
import SwarmSpecialForces from "./swarm-special-forces";
import ZombieCity from "./zombie-city";

/** Maps **
* ...
* @Author Star Noob
* @Created 2022-10-24
*/

export enum Maps {

	ANY_SIMPLE,
	RUNLING_RUN_4,
	RUNLING_RUN_8,
	SWARM_SCPECIAL_FORCES,
	ZOMBIE_CITY,
	ZOMBIE_WORLD_UNITY,
	STAR_CODE_LAB,

}

export const mapProps: Map<number, { title: string, authorID: string, forms: JSX.Element[] }> =
	new Map<number, { title: string, authorID: string, forms: JSX.Element[] }>([

		[Maps.ANY_SIMPLE, {
			title: 'Any Simple Map',
			authorID: '',
			forms: [<AnySimple />]
		}],

		[Maps.RUNLING_RUN_4, {
			title: 'Runling Run 4',
			authorID: '2-S2-1-3564862',
			forms: [<RunlingRun4 bankName='RunlingRun004' />]
		}],

		[Maps.RUNLING_RUN_8, {
			title: 'Runling Run 8',
			authorID: '2-S2-1-5734972',
			forms: [<RunlingRun8ilovePie bankName='ILovePie' />, <RunlingRun8Prestige bankName='Prestige' />]
		}],

		[Maps.SWARM_SCPECIAL_FORCES, {
			title: 'Swarm Special Forces',
			authorID: '2-S2-1-1066242',
			forms: [<SwarmSpecialForces bankName='SwarmSpecialForces' />]
		}],

		[Maps.ZOMBIE_CITY, {
			title: 'Zombie City',
			authorID: '2-S2-1-1687296',
			forms: [<ZombieCity bankName='AMMMAAKDAS39349' />]
		}],

		[Maps.ZOMBIE_WORLD_UNITY, {
			title: 'Zombie World Unity',
			authorID: '2-S2-1-xxxxxxx',
			forms: [<Editor></Editor>]
		}],

		/* [Maps.STAR_CODE_LAB, {
			title: 'Star Code Lab (PRO only)',
			authorID: '',
			forms: [<Editor></Editor>]
		}] */

	]);