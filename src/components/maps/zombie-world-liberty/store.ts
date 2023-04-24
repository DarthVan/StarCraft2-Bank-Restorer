/* Generated with TypeScript snippets */

import { BasicStore } from "src/store/BasicStore";
import { r } from "src/utils/utils";
import { MParam } from "../MParam";
import functions from "./functions";

/** Store **
* ...
* @Author Star Noob
* @Created 2023-02-02
*/

type Hero = {
	active: boolean;
	name: string;
	type: number;
	kills: number;
	level: number;
	prestige: number;
};

type Jewel = {
	type: number;
	minerals: number;
	damage: number;
	life: number;
	armor: number;
	speed: number;
	unique: number;
	upgrade: number;
};

class Store extends BasicStore {

	public stats: MParam[]; // killz, bestSolo, dust, skipwave
	public heroes: Hero[]; // 9 max
	public jewels: Jewel[]; // 100 max

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public setFields(fields?: { stats?: MParam[], heroes?: Hero[], jewels?: Jewel[] }): void {
		this.stats = fields?.stats ? [...fields.stats] : [];
		this.heroes = fields?.heroes ? [...fields.heroes] : [];
		this.jewels = fields?.jewels ? [...fields.jewels] : [];
	}

	public addJewel(bugged: boolean = false): void {
		const jew: Jewel = {
			type: 1,
			minerals: 5,
			damage: 5,
			life: 5,
			armor: 5,
			speed: 5,
			unique: 0,
			upgrade: 0
		};
		this.jewels = [...this.jewels, jew];
	}

	public removeJewel(index: number): void {
		this.jewels = [...this.jewels.filter((jewel: Jewel, i: number): boolean => { return i == index ? false : true })];
	}

	public clearJewels(): void {
		this.jewels = [];
	}

	public selectAllHero(): void {
		const active: boolean = this.heroes[1].active;
		const heroes: Hero[] = [...this.heroes];
		heroes.forEach((hero: Hero, index: number): void => {
			heroes[index] = { ...hero };
			heroes[index].active = !active;
		});
		this.heroes = [...heroes];
	}

	// Есть возможность мутации - лучий оптимизон, но не забывать про flushSync с занулением поля в ключевых местах
	public updateAt(field: 'stats' | 'heroes' | 'jewels', index: number | { i: number, key: keyof Hero | keyof Jewel }, value: number | boolean, mutation?: boolean): void {
		if (mutation) {
			if (field == 'stats' && typeof index == 'number') {
				this[field][index].value = value;
				return;
			}
			if (field != 'stats' && typeof index == 'object') {
				(this[field] as any)[index.i][index.key] = value;
				return;
			}
		}
		if (field == 'stats' && typeof index == 'number') {
			const stats: MParam[] = [...this.stats];
			stats[index].value = value;
			this.stats = stats;
			return;
		}
		if (field != 'stats' && typeof index == 'object') {
			const array: any[] = [...this[field]];
			const obj: any = { ...array[index.i] };
			obj[index.key] = value;
			if (field == 'jewels' && index.key == 'type') {
				const jewel: Jewel = obj as Jewel;
				const { min, max } = functions.getJewelRange(jewel.type);
				jewel.minerals = r(min, max) * 10;
				jewel.damage = r(min, max);
				jewel.life = r(min, max);
				jewel.armor = r(min, max);
				jewel.speed = r(min, max);
			}
			array[index.i] = obj;
			this[field] = array;
			return;
		}
	}

	public override reset(): void {
		this.init();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.stats = [
			{ type: "number", value: 1500000000, description: 'Total Kills' },
			{ type: "number", value: 8, description: 'Best Solo' },
			{ type: "number", value: 1000, description: 'Jewel Dust' },
			{ type: "number", value: 300, description: 'Skip Wave At' }
		];

		this.heroes = [
			{ active: true, name: 'Sniper', type: 1, kills: 5000, level: 20, prestige: 16 },
			{ active: true, name: 'Adept', type: 2, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Zeloat', type: 3, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Archon', type: 4, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Marine', type: 5, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Medic', type: 6, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Probe', type: 7, kills: 5000, level: 20, prestige: 16 },
			{ active: false, name: 'Dark Templar', type: 8, kills: 5000, level: 20, prestige: 16 }
		];

		this.jewels = [
			{
				type: 12, // unique
				minerals: 1250,
				damage: 125,
				life: 125,
				armor: 125,
				speed: 125,
				unique: 1, // Marine gains 1 extra stack of Gatling Gun per attack
				upgrade: 0
			},
			{
				type: 12, // unique
				minerals: 1250,
				damage: 125,
				life: 125,
				armor: 125,
				speed: 125,
				unique: 2, // Cooldowns are 10% faster
				upgrade: 0
			},
			{
				type: 12, // unique
				minerals: 1250,
				damage: 125,
				life: 125,
				armor: 125,
				speed: 125,
				unique: 3, // Adepts crackle missiles travel 2 distance farther
				upgrade: 0
			},
			{
				type: 12, // unique
				minerals: 1250,
				damage: 125,
				life: 125,
				armor: 125,
				speed: 125,
				unique: 4, // Ghosts range upgrade now increases the Shotgun abilities size
				upgrade: 0
			},
			{
				type: 12, // unique
				minerals: 1250,
				damage: 125,
				life: 125,
				armor: 125,
				speed: 125,
				unique: 5, // Damage from your Dark Templars main weapon applies an extra stack of Ambush on hit.
				upgrade: 0
			},
			{
				type: 11, // bugged
				minerals: 1250,
				damage: -5000,
				life: 125,
				armor: 125,
				speed: -1000,
				unique: 0,
				upgrade: -200
			},
			{
				type: 11, // bugged
				minerals: 1250,
				damage: -5000,
				life: 125,
				armor: 125,
				speed: -1000,
				unique: 0,
				upgrade: -200
			}
		];
	}

}

export default new Store();