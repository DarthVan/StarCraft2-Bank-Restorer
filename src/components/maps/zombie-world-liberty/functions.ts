/* Generated with TypeScript snippets */

import { Bank, BankKey } from '@src/core/bank';
import { sc2_div, sc2_fstr, sc2_pow, sc2_sqrt } from '@src/core/sc2';
import { MParam } from '../MParam';
import store from './store';

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	public generateXML(bank: Bank): string {

		// reset from old keys
		bank.removeSection('Purchases');
		bank.removeSection('Primary');
		bank.removeSection('SoulStat');
		bank.removeSection('SoulType');
		bank.removeSection('CLHistory');

		// 1. stats:
		const killz: number = store.stats[0].value as number;
		bank.addKey('Primary', 'INT', killz, 'Primary');

		const pd_8_11: number = parseInt(bank.info.playerID.substring(7, 11));
		bank.addKey('Version', 'FIXED', sc2_fstr(sc2_div(sc2_sqrt(killz), pd_8_11 + 1)), 'Version');

		if (store.stats[1].value as number > 0) {
			const bestSolo: number = store.stats[1].value as number;
			bank.addKey('BS', 'INT', bestSolo, 'Primary');

			const pd_10_11: number = parseInt(bank.info.playerID.substring(9, 11));
			bank.addKey('BC', 'FIXED', sc2_fstr(sc2_div(sc2_pow(bestSolo, 2), pd_10_11 + 1)), 'Primary');
		}

		const dust: number = store.stats[2].value as number;
		bank.addKey('Ratio', 'INT', dust * 13, 'Settings');
		let dustSoulsSum: number = dust * 10;

		bank.addKey('skipwavethreshold', 'INT', store.stats[3].value, 'Settings');

		// 2. heroes:
		let combined: number = 0;
		let intComb: number = 0;
		const totalHeroes: number = store.heroes.length; // 9 max
		for (let i: number = 0; i < totalHeroes; i++) {
			const hero = store.heroes[i];
			if (!hero.active && i > 0)
				continue;

			const index: number = hero.type; // 1,2,3...8

			bank.addKey('H' + index, 'FLAG', true, 'Purchases');

			bank.addKey('H' + index + 'K', 'INT', hero.kills, 'Primary');
			bank.addKey('H' + index + 'L', 'INT', hero.level, 'Primary');
			bank.addKey('H' + index + 'P', 'INT', hero.prestige, 'Primary');

			intComb += (index * (index + 1));
			combined += hero.kills;
			combined += hero.level - 1;
			combined += hero.prestige;
		}

		bank.addKey('Previous', 'FIXED', sc2_fstr(sc2_div(sc2_sqrt(combined), pd_8_11 + 2)), 'Version');

		const pd_8_10: number = parseInt(bank.info.playerID.substring(7, 10));
		bank.addKey('Upcoming', 'FIXED', sc2_fstr(sc2_div(sc2_sqrt(intComb), pd_8_10 + 3.25)), 'Version');

		// 3. jewels
		const totalJewels: number = store.jewels.length; // 100 max
		for (let i: number = 0; i < totalJewels; i++) {
			const jewel = store.jewels[i];

			bank.addKey('Soul' + (i + 1), 'INT', jewel.type, 'SoulType'); // 1 - 12

			bank.addKey('Soul' + (i + 1) + 'Stat1', 'FIXED', jewel.minerals, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat2', 'FIXED', jewel.damage, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat3', 'FIXED', jewel.life, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat4', 'FIXED', jewel.armor, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat5', 'FIXED', jewel.speed, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat6', 'FIXED', jewel.unique, 'SoulStat');
			bank.addKey('Soul' + (i + 1) + 'Stat7', 'FIXED', jewel.upgrade, 'SoulStat');

			dustSoulsSum += jewel.minerals + jewel.damage + jewel.life + jewel.armor + jewel.speed + jewel.unique + jewel.upgrade;
		}

		// Challenges:
		if (store.stats[4]) {

			const pd_9_10: number = parseInt(bank.info.playerID.substring(8, 10));
			const afterDot: number = 4;

			for (let i: number = 0; i < 30; i++) {
				const key: string = "C" + sc2_fstr(sc2_pow(((i + 1) * pd_9_10), 2.0), afterDot);
				bank.addKey(key, 'FLAG', true, 'CLHistory');
			}
		}


		const pd_9_11: number = parseInt(bank.info.playerID.substring(8, 11));
		const time: string = sc2_fstr(sc2_div(sc2_sqrt(dustSoulsSum), pd_9_11 + sc2_sqrt(dustSoulsSum) + 1));
		bank.addKey('Time', 'FIXED', time, 'TimePlayed');

		// sort and update signature
		bank.sort();
		bank.updateSignature();
		//console.log('bank const updated:', bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): { stats: MParam[], heroes: any[], jewels: any[] } {
		bank.parse(value);
		if (bank.sections.size < 2 || bank.sections.get('Primary') == null || bank.sections.get('Purchases') == null) {
			console.error('Wrong bank file!');
			return null;
		}

		let key: BankKey;

		// 1. stats
		const stats: MParam[] = [
			{ type: 'number', value: 0, description: 'Total Kills' },
			{ type: 'number', value: 1, description: 'Best Solo' },
			{ type: 'number', value: 0, description: 'Jewel Dust' },
			{ type: 'number', value: 300, description: 'Skip Wave At' }
		];

		key = bank.getKey('Primary', 'Primary');
		if (key) stats[0].value = key.value;

		key = bank.getKey('BS', 'Primary')
		if (key) stats[1].value = key.value;

		key = bank.getKey('Ratio', 'Settings')
		if (key) stats[2].value = key.value / 13;

		key = bank.getKey('skipwavethreshold', 'Settings')
		if (key) stats[3].value = key.value;

		// 2. heroes
		const heroes: any[] = [
			{ active: true, name: 'Sniper', type: 1, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Adept', type: 2, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Zeloat', type: 3, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Archon', type: 4, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Marine', type: 5, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Medic', type: 6, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Probe', type: 7, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Dark Templar', type: 8, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Firebat', type: 9, kills: 0, level: 1, prestige: 0 },
			{ active: false, name: 'Siege Tank', type: 10, kills: 0, level: 1, prestige: 0 }
		];

		for (let i: number = 0; i < 9; i++) {
			const index: number = i + 1;

			key = bank.getKey('H' + index, 'Purchases');
			if (!key)
				continue;

			heroes[i].active = true;

			key = bank.getKey('H' + index + 'K', 'Primary');
			if (key) heroes[i].kills = key.value;

			key = bank.getKey('H' + index + 'L', 'Primary');
			if (key) heroes[i].level = key.value;

			key = bank.getKey('H' + index + 'P', 'Primary');
			if (key) heroes[i].prestige = key.value;
		}

		// 3. jewels
		const jewels: any[] = [];
		for (let i: number = 0; i < 100; i++) {
			const index: number = i + 1;

			key = bank.getKey('Soul' + index, 'SoulType');
			if (!key)
				continue;

			const jewel = {
				type: key.value,
				minerals: bank.getKey('Soul' + index + 'Stat1', 'SoulStat').value,
				damage: bank.getKey('Soul' + index + 'Stat2', 'SoulStat').value,
				life: bank.getKey('Soul' + index + 'Stat3', 'SoulStat').value,
				armor: bank.getKey('Soul' + index + 'Stat4', 'SoulStat').value,
				speed: bank.getKey('Soul' + index + 'Stat5', 'SoulStat').value,
				unique: bank.getKey('Soul' + index + 'Stat6', 'SoulStat').value,
				upgrade: bank.getKey('Soul' + index + 'Stat7', 'SoulStat').value,
			}

			jewels.push(jewel);
		}

		return { stats, heroes, jewels };
	}

	public getJewelTypes(): { value: string, label: string }[] {
		return [
			{ value: '1', label: 'Simple' },
			{ value: '2', label: 'Regular' },
			{ value: '3', label: 'Advanced' },
			{ value: '4', label: 'Brutality' },
			{ value: '5', label: 'Insanity' },
			{ value: '6', label: 'Nightmare' },
			{ value: '7', label: 'Chaos' },
			{ value: '8', label: 'Agonizing' },
			{ value: '9', label: 'Inferno' },
			{ value: '10', label: 'Tormented' },
			{ value: '11', label: 'Death' },
			{ value: '12', label: 'Unique' }
		];
	}

	public getJewelRange(type: number): { min: number, max: number } {
		switch (type) {
			case 1: return { min: 1, max: 5 }; break;
			case 2: return { min: 5, max: 10 }; break;
			case 3: return { min: 5, max: 20 }; break;
			case 4: return { min: 10, max: 30 }; break;
			case 5: return { min: 15, max: 40 }; break;
			case 6: return { min: 20, max: 50 }; break;
			case 7: return { min: 25, max: 60 }; break;
			case 8: return { min: 30, max: 75 }; break;
			case 9: return { min: 35, max: 90 }; break;
			case 10: return { min: 40, max: 90 }; break;
			case 11: return { min: 50, max: 125 }; break;
			case 12: return { min: 50, max: 125 }; break;
		}
		return null;
	}

	public getUniqueJewelsTypes(): { value: string, label: string }[] {
		return [
			{ value: '1', label: 'Marine buff' },
			{ value: '2', label: 'Cooldowns 10%' },
			{ value: '3', label: 'Adept buff' },
			{ value: '4', label: 'Ghost buff' },
			{ value: '5', label: 'Dark Templar buff' }
		];
	}

	public getDifficultTypes(): { value: string, label: string, disabled?: boolean }[] {
		return [
			{ value: '0', label: 'None' },
			{ value: '1', label: 'Easy' },
			{ value: '2', label: 'Normal' },
			{ value: '3', label: 'Hard' },
			{ value: '4', label: 'Brutal' },
			{ value: '5', label: 'Insane' },
			{ value: '6', label: 'Nightmare' },
			{ value: '7', label: 'Chaotic' },
			{ value: '8', label: 'Torture' },
			{ value: '9', label: 'Inferno' },
			{ value: '10', label: 'Torment' },
			{ value: '11', label: 'Death' },
		];
	}

	/* public getHeroTypes(): { value: string, label: string }[] {
		const array: { value: string, label: string }[] = [
			{ value: '1', label: 'Sniper' },
			{ value: '2', label: 'Adept' },
			{ value: '3', label: 'Zeloat' },
			{ value: '4', label: 'Archon' },
			{ value: '5', label: 'Marine' },
			{ value: '6', label: 'Medic' },
			{ value: '7', label: 'Probe' },
			{ value: '8', label: 'Dark Templar' },
			{ value: '9', label: '?' }
		];

		const length: number = store.heroes.length;
		for (let i: number = 0; i < length; i++)
			array.filter((current: { value: string, label: string }): boolean => {
				return store.heroes[i].type.toString() == current.value ? true : false;
			});

		return array;
	} */
}

export default new Functions();