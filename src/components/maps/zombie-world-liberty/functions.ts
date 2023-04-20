/* Generated with TypeScript snippets */

import { Bank } from "src/core/bank/bank";
import { BankKey } from "src/core/bank/bank-key";
import { gsDivide, gsPow, gsSqrt } from "src/core/galaxy/math";
import { MParam } from "../MParam";
import store from "./store";

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	public generateXML(bank: Bank): string {

		// reset from old keys
		bank.removeSection("Purchases");
		bank.removeSection("Primary");
		bank.removeSection("SoulStat");
		bank.removeSection("SoulType");

		// Purchases
		// bank.addKey("HeroRank" + lp_hero, 'INT', heroRank, "Purchases");

		// 1. stats:
		const killz: number = store.stats[0].value as number;
		bank.addKey("Primary", 'INT', killz, "Primary");

		const pd_8_11: number = parseInt(bank.info.playerID.substring(7, 11));
		bank.addKey("Version", 'FIXED', gsDivide(gsSqrt(killz), pd_8_11 + 1), "Version");

		const bestSolo: number = store.stats[1].value as number;
		bank.addKey("BS", 'INT', bestSolo, "Primary");

		const pd_10_11: number = parseInt(bank.info.playerID.substring(9, 11));
		bank.addKey("BC", 'FIXED', gsDivide(gsPow(bestSolo, 2), pd_10_11 + 1), "Primary");

		const dust: number = store.stats[2].value as number;
		bank.addKey("Ratio", 'INT', dust * 13, "Settings");
		let dustSoulsSum: number = dust * 10;

		bank.addKey("skipwavethreshold", 'INT', store.stats[3].value, "Settings");


		// 2. heroes:
		let combined: number = 0;
		let intComb: number = 0;
		const totalHeroes: number = store.heroes.length; // 9 max
		for (let i: number = 0; i < totalHeroes; i++) {
			const index: number = store.heroes[i].type; // 1,2,3...8

			if (!store.heroes[i].active && i > 0)
				continue;

			bank.addKey("H" + index, 'FLAG', true, "Purchases");

			bank.addKey("H" + index + "K", 'INT', store.heroes[i].kills, "Primary");
			bank.addKey("H" + index + "L", 'INT', store.heroes[i].level, "Primary");
			bank.addKey("H" + index + "P", 'INT', store.heroes[i].prestige, "Primary");

			intComb += (index * (index + 1)); // ?
			combined += store.heroes[i].kills;
			combined += store.heroes[i].level - 1;
			combined += store.heroes[i].prestige;
		}
		//bank.addKey("H0K", 'INT', 0, "Primary");

		bank.addKey("Previous", 'FIXED', gsDivide(gsSqrt(combined), pd_8_11 + 2), "Version");

		const pd_8_10: number = parseInt(bank.info.playerID.substring(7, 10));
		bank.addKey("Upcoming", 'FIXED', gsDivide(gsSqrt(intComb), pd_8_10 + 3.25), "Version");


		// 3. jewels
		const totalJewels: number = store.jewels.length; // 100 max
		for (let i: number = 0; i < totalJewels; i++) {
			const jew = store.jewels[i];

			bank.addKey("Soul" + (i + 1), 'INT', jew.type, "SoulType"); // 1 - 12

			bank.addKey("Soul" + (i + 1) + "Stat1", 'FIXED', jew.minerals, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat2", 'FIXED', jew.damage, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat3", 'FIXED', jew.life, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat4", 'FIXED', jew.armor, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat5", 'FIXED', jew.speed, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat6", 'FIXED', jew.unique, "SoulStat");
			bank.addKey("Soul" + (i + 1) + "Stat7", 'FIXED', jew.upgrade, "SoulStat");

			dustSoulsSum += jew.minerals + jew.damage + jew.life + jew.armor + jew.speed + jew.unique + jew.upgrade;
		}

		const pd_9_11: number = parseInt(bank.info.playerID.substring(8, 11));
		const time: number = gsDivide(gsSqrt(dustSoulsSum), pd_9_11 + gsSqrt(dustSoulsSum) + 1);
		bank.addKey("Time", 'FIXED', time, "TimePlayed");




		/*
		// check 1:  BC=2.25 BS=3
		// use Math.floor( ... * 1000) / 1000
		const playerDigits_10_11: number = parseInt('2-S2-1-10374481'.substring(9, 10)); // 37
		if (BC != Math.pow(BS, 2.0) / (playerDigits_10_11 + 1.0) && BC != 1.0) {
			// cheater
		}
		// 0.1052 == 4 / 38 = 0.1052 //OK


		// check 2:
		lv_dustResource = bank.getKey("Ratio", "Settings").value / 13;  // 20
		lv_keyNumber = (lv_dustResource * 10); // 0 * 10 = 0    // 200
		for (let i: number = 1; i <= 100; i++) {
			if (bank.getKey("Soul" + i, "SoulType")?.value) {
				//lv_soulsRecord[i].lv_soulType = bank.getKey("Soul" + i, "SoulType").value;
				for (let j: number = 1; j <= 7; j++) {
					lv_soulsRecord[i].lv_soulStats[j] = bank.getKey("Soul" + i + "Stat" + j, "SoulStat").value;
					lv_keyNumber += lv_soulsRecord[i].lv_soulStats[j]; // 0 + 6 + 7 + 5 + 1250 + 0 + 125 = 117

					// 200 + 3500 + 5 = 3705  // sqrt = 6086
				}
			}
		}

		const playerDigits_9_11: number = parseInt('2-S2-1-10374481'.substring(8, 10)); // 037
		lv_kV = bank.getKey("Time", "TimePlayed").value;
		if (lv_kV != Math.sqrt(lv_keyNumber) / (playerDigits_9_11 + Math.sqrt(lv_keyNumber) + 1.0)) {
			// cheater
		}
		// 0.2214 == 10.81 / (37 + 10.81 + 1) == 0.2213 <<<<<<<<<<<<<<<<<<<<<< bug
		// 0.6156 == 0.6156 // OK



		// check 3:
		lv_totalKills = bank.getKey("Primary", "Primary").value; // 8900
		lv_sV = bank.getKey("Version", "Version").value; // 0.0908
		const playerDigits_8_11: number = parseInt('2-S2-1-10374481'.substring(7, 10)); // 1037
		if (lv_sV != Math.sqrt(lv_totalKills) / (playerDigits_8_11 + 1.0)) {
			// cheater
		}
		// 94.33 / (1037 + 1) = 0.0908 // OK!
		// 547.72 / 1037 + 1 = 0.5276 // ok!


		// check 4:
		const lv_prestigeIndependentHeroKills: number[] = [];
		const lv_prestigeIndependentHeroLevel: number[] = [];
		const lv_prestigeIndependentHeroPrestige: number[] = [];

		let bankKey: BankKey;
		for (let i: number = 1; i <= 30; i++) {
			bankKey = bank.getKey("H" + i + "K", "Primary");
			if (bankKey)
				lv_prestigeIndependentHeroKills[i] = bankKey.value;

			bankKey = bank.getKey("H" + i + "L", "Primary");
			if (bankKey)
				lv_prestigeIndependentHeroLevel[i] = bankKey.value;

			bankKey = bank.getKey("H" + i + "P", "Primary");
			if (bankKey)
				lv_prestigeIndependentHeroPrestige[i] = bankKey.value;
		}

		let lv_prestigeCombined: number = 0;
		for (let i: number = 1; i <= 9; i++) {
			lv_prestigeCombined += Math.floor(lv_prestigeIndependentHeroKills[i]); // 142
			lv_prestigeCombined += lv_prestigeIndependentHeroLevel[i] - 1; // 9 - 1 = 8
			lv_prestigeCombined += lv_prestigeIndependentHeroPrestige[i]; // -
		} // 150 total, 538   // 18074 sqet = 134.43

		lv_pV = bank.getKey("Previous", "Version").value; // 0.0117
		if (lv_pV != Math.sqrt(lv_prestigeCombined) / (playerDigits_8_11 + 2.0)) {
			// cheater
		}
		// 0.0117 == 12.24 / (1037 + 2) = 0.0117 // OK
		// 0.0222 == 32.19 / 1039
		// 0.1293 == 134.43 / 1039   // OK



		// check 5:
		const playerDigits_8_10: number = parseInt('2-S2-1-10374481'.substring(7, 9)); // 103
		let lv_hCombined: number = 0;

		for (let i: number = 1; i <= 9; i++) {
			if (bank.getKey("H" + i, "Purchases")?.value == '1') // true
				lv_hCombined += i * (i + 1);
		} // total 2; 8

		lv_hV = bank.getKey("Upcoming", "Version").value; // 0.0131
		if (lv_hV != Math.sqrt(lv_hCombined) / (playerDigits_8_10 + 3.25)) {
			// cheater
		}
		// 0.0131 == 1.41 / (103 + 3.25) = 0.0132  // OK! WTF COMPARE IS SUCCESS
		// 0.0265 == 2.82 / (106.25) = 0.0265 // ok
		*/




		// sort and update signature
		bank.sort();
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): { stats: MParam[], heroes: any[], jewels: any[] } {
		bank.parse(value);
		if (bank.sections.size < 4 || bank.sections.get("jjj") == null || bank.sections.get("jj") == null
			|| bank.sections.get("TP") == null || bank.sections.get("PlayerIDNumber") == null) {
			console.error('Wrong bank file!');
			return null;
		}

		/* return [
			{ type: "number", value: parseInt(bank.getKey("wave", "number").value), description: 'Waves' },
			{ type: "number", value: parseInt(bank.getKey("PlayerID", "PlayerIDNumber").value) / 5, description: 'Talent points' },

			{ type: "boolean", value: store.params[2].value, description: 'Fill all talents' },
			{ type: "boolean", value: store.params[3].value, description: 'Get all challanges' },
			{ type: "boolean", value: store.params[4].value, description: 'Upgrade all units' },

			{ type: "number", value: parseInt(bank.getKey("assassinkills", "jjj").value), description: 'Assassin kills' },
			{ type: "number", value: parseInt(bank.getKey("builderkills", "jjj").value), description: 'Builder kills' },
			{ type: "number", value: parseInt(bank.getKey("singletargetkills", "jjj").value), description: 'Singletarget kills' },
			{ type: "number", value: parseInt(bank.getKey("specialistkills", "jjj").value), description: 'Specialist kills' },
			{ type: "number", value: parseInt(bank.getKey("splashkills", "jjj").value), description: 'Splash kills' },
			{ type: "number", value: parseInt(bank.getKey("supportkills", "jjj").value), description: 'Support kills' },
			{ type: "number", value: parseInt(bank.getKey("tankkills", "jjj").value), description: 'Tank kills' },
		]; */

		return null;
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

	public getDifficultTypes(): { value: string, label: string }[] {
		return [
			{ value: '1', label: 'Easy' },
			{ value: '2', label: 'Normal' },
			{ value: '3', label: 'Hard' },
			{ value: '4', label: 'Brutal' },
			{ value: '5', label: 'Insane' },
			{ value: '6', label: 'Nightmare' },
			{ value: '7', label: 'Chaotic' },
			{ value: '8', label: 'Torture' },
			{ value: '9', label: 'Inferno' }
		];
	}

	public getHeroTypes(): { value: string, label: string }[] {
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
	}
}

export default new Functions();


/*
void gf_AddMinsToArray () {
	// Variable Declarations
	int lv_item;

	// Automatic Variable Declarations
	// Variable Initialization
	lv_item = 1;

	// Implementation
	gv_minArray[lv_item] = 1;
	lv_item += 1;
	gv_minArray[lv_item] = 5;
	lv_item += 1;
	gv_minArray[lv_item] = 5;
	lv_item += 1;
	gv_minArray[lv_item] = 10;
	lv_item += 1;
	gv_minArray[lv_item] = 15;
	lv_item += 1;
	gv_minArray[lv_item] = 20;
	lv_item += 1;
	gv_minArray[lv_item] = 25;
	lv_item += 1;
	gv_minArray[lv_item] = 30;
	lv_item += 1;
	gv_minArray[lv_item] = 35;
	lv_item += 1;
	gv_minArray[lv_item] = 40;
	lv_item += 1;
	gv_minArray[lv_item] = 50;
	lv_item += 1;
	gv_minArray[lv_item] = 50;
	lv_item += 1;
}

void gf_AddMaxsToArray () {
	// Variable Declarations
	int lv_item;

	// Automatic Variable Declarations
	// Variable Initialization
	lv_item = 1;

	// Implementation
	gv_maxArray[lv_item] = 5;
	lv_item += 1;
	gv_maxArray[lv_item] = 10;
	lv_item += 1;
	gv_maxArray[lv_item] = 20;
	lv_item += 1;
	gv_maxArray[lv_item] = 30;
	lv_item += 1;
	gv_maxArray[lv_item] = 40;
	lv_item += 1;
	gv_maxArray[lv_item] = 50;
	lv_item += 1;
	gv_maxArray[lv_item] = 60;
	lv_item += 1;
	gv_maxArray[lv_item] = 75;
	lv_item += 1;
	gv_maxArray[lv_item] = 90;
	lv_item += 1;
	gv_maxArray[lv_item] = 105;
	lv_item += 1;
	gv_maxArray[lv_item] = 125;
	lv_item += 1;
	gv_maxArray[lv_item] = 125;
	lv_item += 1;
}

void gf_SetSoulBaseNames () {
	// Variable Declarations
	int lv_item;

	// Automatic Variable Declarations
	// Variable Initialization
	lv_item = 1;

	// Implementation
	gv_soulNames[lv_item] = "Simple Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Regular Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Advanced Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Brutality Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Insanity Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Nightmare Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Chaos Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Agonizing Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Inferno Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Tormented Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Death Jewel";
	lv_item += 1;
	gv_soulNames[lv_item] = "Unique Jewel";
} */