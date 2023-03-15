/* Generated with TypeScript snippets */

import { Bank } from "src/core/bank/bank";
import starcode from "src/core/scarcode/starcode";
import { n2t, r, t2n } from "src/utils/utils";
import { MParam } from "../MParam";
import storage from "./SSFStorage";
import store from "./store";

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	private readonly STARCODE_PART: string = 'gehkaggen11'; // noice protection :)
	private readonly STARCODE_HASH: number = 4;

	private readonly VERSION: number = 2011;

	private _scKey: string;

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	// realistic random combination
	public generateDefault(myKillz?: number): {
		light?: MParam[],
		heavy?: MParam[],
		speed?: MParam[][][],
		options?: MParam[],
		bools?: any[]
	} {
		// 1. light data:
		const killz: number = myKillz ? myKillz : r(500000, 9000000);
		const light: MParam[] = [
			{ type: 'number', value: killz, description: 'Kills' },
			{ type: 'number', value: Math.floor(killz / r(180, 220)), description: 'Points' },
			{ type: 'number', value: Math.floor(killz / r(3200, 3500)), description: 'Scientists' },
			{ type: 'number', value: Math.floor(killz / r(1500, 1800)), description: 'Essences' },
			{ type: 'number', value: Math.floor(killz / r(8000, 12000)), description: 'Psi Orbs' },
			{ type: 'number', value: Math.floor(killz / r(14000, 16000)), description: 'MoopyHats' }
		];

		// 2. heavy data:
		const heavy: MParam[] = [];
		for (let i: number = 0; i < 3; i++) { // 3 parts
			const wins: number = Math.floor(killz / r(1200 * (i + 1), 2000 * (i + 1)));
			heavy.push({ type: 'number', value: wins, description: 'Wins ' + (i + 1) });
		}

		for (let i: number = 0; i < 4; i++) // 4 bosses fields
			heavy.push({ type: 'number', value: 0, description: 'Boss ' + (i + 1) + ' crypted', hidden: true });

		heavy.push(
			{ type: 'number', value: 0, description: 'Flawless crypted', hidden: true },
			{ type: 'boolean', value: true, description: 'Tutorial' },
			{ type: 'number', value: r(0, 10), description: 'ArchivedAcv' }
		);

		// 3. speedruns:
		const speed: MParam[][][] = [];
		for (let i: number = 0; i < 6; i++) { // 6 difficults
			speed.push([]);
			for (let j: number = 0; j < 3; j++) { // 3 parts
				speed[i].push([]);
				for (let k: number = 0; k < 2; k++) { // solo / team values
					speed[i][j].push(
						{ type: 'string', value: n2t(r(250, 500) * Math.pow((i + 1), 1.5) / (k + 1)), description: 'time ' }
					);
				}
			}
		}

		// 4. options. just for store
		const options: MParam[] = [
			{ type: 'number', value: 0, description: 'Hero type', hidden: true },
			{ type: 'boolean', value: false, description: 'Hero selected', hidden: true },
			{ type: 'boolean', value: false, description: 'Speedrun details', hidden: true },
			{ type: 'boolean', value: true, description: 'Hero panel' },
			{ type: 'boolean', value: false, description: 'Hive panel' },
			{ type: 'number', value: 0, description: 'Unit selection', hidden: true },

			{ type: 'boolean', value: true, description: 'Control group 1b', hidden: true },
			{ type: 'number', value: 1, description: 'Control group 1n', hidden: true },
			{ type: 'boolean', value: true, description: 'Control group 2b', hidden: true },
			{ type: 'number', value: 2, description: 'Control group 2n', hidden: true },
			{ type: 'boolean', value: true, description: 'Control group 3b', hidden: true },
			{ type: 'number', value: 3, description: 'Control group 3n', hidden: true },
			{ type: 'boolean', value: true, description: 'Control group 4b', hidden: true },
			{ type: 'number', value: 3, description: 'Control group 4n', hidden: true },
			{ type: 'boolean', value: true, description: 'Control group 5b', hidden: true },
			{ type: 'number', value: 3, description: 'Control group 5n', hidden: true }
		];

		// 5. bools for store only
		const bools: any[] = [...store.bools];
		const totalBools: number = bools.length
		for (let i: number = 0; i < totalBools; i++)
			bools[i].flags = this.makeSixBoolsFor(bools[i].name);

		return { light, heavy, speed, options, bools };
	}

	public parse(bank: Bank, value: string): {
		light?: MParam[],
		heavy?: MParam[],
		speed?: MParam[][][],
		options?: MParam[],
		bools?: any[]
	} {
		bank.parse(value);
		if (bank.sections.size != 1 || !bank.sections.has('stats')) {
			console.error('Wrong bank file!');
			return null;
		}

		this.reloadStorage(bank, 'lightData');
		const light: MParam[] = [
			{ type: 'number', value: storage.getInt(), description: 'Kills' },
			{ type: 'number', value: storage.getInt(), description: 'Points' },
			{ type: 'number', value: storage.getInt(), description: 'Scientists' },
			{ type: 'number', value: storage.getInt(), description: 'Essences' },
			{ type: 'number', value: storage.getInt(), description: 'Psi Orbs' },
			{ type: 'number', value: storage.getInt(), description: 'MoopyHats' }
		];
		storage.getInt(); // unused random value
		if (storage.getInt() != this.VERSION)
			throw new Error('Invaliid version in lightData');

		// 2. heavyData:
		this.reloadStorage(bank, 'heavyData');
		const heavy: MParam[] = [];
		for (let i: number = 0; i < 3; i++) // 3 parts
			heavy.push({ type: 'number', value: storage.getInt(), description: 'Wins ' + (i + 1) });
		for (let i: number = 0; i < 4; i++) // 4 bosses fields
			heavy.push({ type: 'number', value: storage.getInt(), description: 'Boss ' + (i + 1) + ' crypted', hidden: true });
		heavy.push(
			{ type: 'number', value: storage.getInt(), description: 'Flawless crypted', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Tutorial' },
			{ type: 'number', value: storage.getInt(), description: 'ArchivedAcv' }
		);
		storage.getInt(); // unused random value
		if (storage.getInt() != this.VERSION)
			throw new Error('Invaliid version in heavyData');

		// 3. Speedruns:
		this.reloadStorage(bank, 'speedrunsData');
		const speed: MParam[][][] = [];
		for (let i: number = 0; i < 6; i++) { // 6 difficults
			speed.push([]);
			for (let j: number = 0; j < 3; j++) { // 3 parts
				speed[i].push([]);

				let solo: number = 0;
				let team: number = 0;
				for (let k: number = 0; k < 6; k++) { // players
					const v: number = storage.getInt();
					k < 4 ? solo = Math.max(solo, v) : team = Math.max(team, v);
				}
				speed[i][j].push({ type: 'string', value: n2t(solo), description: 'time ' });
				speed[i][j].push({ type: 'string', value: n2t(team), description: 'time ' });
			}
		}
		storage.getInt(); // unused random value
		if (storage.getInt() != this.VERSION)
			throw new Error('Invaliid version in speedrunsData');

		// 4. options:
		storage.data = bank.getKey('options', 'stats').value;
		const options: MParam[] = [
			{ type: 'number', value: storage.getInt(), description: 'Hero type', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Hero selected', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Speedrun details', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Hero panel' },
			{ type: 'boolean', value: storage.getBool(), description: 'Hive panel' },
			{ type: 'number', value: storage.getInt(), description: 'Unit selection', hidden: true },

			{ type: 'boolean', value: storage.getBool(), description: 'Control group 1b', hidden: true },
			{ type: 'number', value: storage.getInt(), description: 'Control group 1n', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Control group 2b', hidden: true },
			{ type: 'number', value: storage.getInt(), description: 'Control group 2n', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Control group 3b', hidden: true },
			{ type: 'number', value: storage.getInt(), description: 'Control group 3n', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Control group 4b', hidden: true },
			{ type: 'number', value: storage.getInt(), description: 'Control group 4n', hidden: true },
			{ type: 'boolean', value: storage.getBool(), description: 'Control group 5b', hidden: true },
			{ type: 'number', value: storage.getInt(), description: 'Control group 5n', hidden: true }
		];

		return { light, heavy, speed, options, bools: store.bools };
	}

	public generateXML(bank: Bank): string {
		bank.addSection('stats');
		bank.addKey('version', 'FIXED', '2.01', 'stats');

		// 1. light data:
		storage.reset();
		for (let i: number = 0; i < 6; i++)
			storage.addInt(store.light[i].value as number);
		storage.addInt(r(1, 500));
		storage.addInt(this.VERSION);
		bank.addKey('lightData', 'STRING', this.storageToSC(), 'stats');

		// 2. heavy data:
		storage.reset();
		for (let i: number = 0; i < 10; i++)
			if (store.heavy[i].type == 'number')
				storage.addInt(store.heavy[i].value as number);
			else
				storage.addBool(store.heavy[i].value as boolean);
		storage.addInt(r(1, 500));
		storage.addInt(this.VERSION);
		bank.addKey('heavyData', 'STRING', this.storageToSC(), 'stats');

		// 3. speedruns:
		storage.reset();
		for (let i: number = 0; i < 6; i++) // difficults
			for (let j: number = 0; j < 3; j++) // parts
				for (let k: number = 0; k < 6; k++) // players
					storage.addInt(t2n(
						k < 4 ? store.speed[i][j][0].value as string : store.speed[i][j][1].value as string
					));
		storage.addInt(r(1, 500));
		storage.addInt(this.VERSION);
		bank.addKey('speedrunsData', 'STRING', this.storageToSC(), 'stats');

		// 4. options:
		storage.reset();
		for (let i: number = 0; i < 6; i++)
			if (i > 0 && i < 5)
				storage.addBool(store.options[i].value as boolean);
			else
				storage.addInt(store.options[i].value as number);
		for (let i: number = 0; i < 10; i += 2) {
			storage.addBool(store.options[i + 6].value as boolean);
			storage.addInt(store.options[i + 7].value as number);
		}
		bank.addKey('options', 'STRING', storage.data, 'stats');

		// result
		bank.sort();
		bank.updateSignature();

		return bank.getAsString();
	}

	public recryptAchives(): void {
		const crypto: number[] = [0, 0, 0, 0, 0];

		for (let diff: number = 0; diff < 6; diff++)
			for (let boss: number = 0; boss < 14; boss++) // boss
				if (store.bools[boss].flags[diff].value == true)
					crypto[store.bools[boss].part] ^= 1 << (diff + 6 * store.bools[boss].offset); // 6 - total diffs

		for (let diff: number = 0; diff < 6; diff++)
			for (let part: number = 14; part < 17; part++) // flawless
				if (store.bools[part].flags[diff].value == true)
					crypto[4] ^= 1 << (diff + 6 * store.bools[part].part); // 6 - total diffs

		// indexes in heavyData: 3, 4, 5, 6, 7
		for (let i: number = 0; i < 4; i++) // bosses
			store.updateAt('heavy', i + 3, crypto[i] as number, true); // bosses
		store.updateAt('heavy', 7, crypto[4] as number, true); // flawless
		//console.log(crypto);
		// max values are:
		// for 1,4,flawless - 262143
		// for 2,3 - 16777215
	}

	public updateKey(playerID: string): void {
		this._scKey = playerID + this.STARCODE_PART;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private storageToSC(): string {
		return starcode.encrypt(starcode.addHash(starcode.compress(storage.data), this.STARCODE_HASH), this._scKey);
	}

	private reloadStorage(bank: Bank, key: string, section: string = 'stats'): void {
		let s: string = starcode.decrypt(bank.getKey(key, section).value, this._scKey);
		if (!starcode.validate(s, this.STARCODE_HASH))
			throw new Error('Invaliid data in ' + section + ' → ' + key + '!');
		s = starcode.decompress(starcode.removeHash(s, this.STARCODE_HASH));
		storage.data = s;
	}

	private makeSixBoolsFor(name: string): MParam[] {
		const diffs: string[] = ['Easy', 'Normal', 'Hard', 'Brutal', 'Insane', 'Hardcore'];
		const array: MParam[] = [];
		for (let i: number = 0; i < 6; i++)
			array.push({ type: 'boolean', value: Math.random() > 0.5, description: name + ' ' + diffs[i] });
		return array;
	}
}

export default new Functions();