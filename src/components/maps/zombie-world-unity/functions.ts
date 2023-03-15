/* Generated with TypeScript snippets */

import { Bank } from "src/core/bank/bank";
import { MParam } from "../MParam";
import store from "./store";

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	public generateXML(bank: Bank): string {

		// number sectioin (waves)
		bank.addKey("wave", 'INT', store.params[0].value, "number"); // > 17000 = cheater :)

		// jj / jjj sections (killz)
		bank.addKey("assassinkills", 'INT', store.params[5].value, "jjj");
		bank.addKey("assassinkills", 'INT', store.params[5].value, "jj");

		bank.addKey("builderkills", 'INT', store.params[6].value, "jjj");
		bank.addKey("builderkills", 'INT', store.params[6].value, "jj");

		bank.addKey("singletargetkills", 'INT', store.params[7].value, "jjj");
		bank.addKey("singletargetkills", 'INT', store.params[7].value, "jj");

		bank.addKey("specialistkills", 'INT', store.params[8].value, "jjj");
		bank.addKey("specialistkills", 'INT', store.params[8].value, "jj");

		bank.addKey("splashkills", 'INT', store.params[9].value, "jjj");
		bank.addKey("splashkills", 'INT', store.params[9].value, "jj");

		bank.addKey("supportkills", 'INT', store.params[10].value, "jjj");
		bank.addKey("supportkills", 'INT', store.params[10].value, "jj");

		bank.addKey("tankkills", 'INT', store.params[11].value, "jjj");
		bank.addKey("tankkills", 'INT', store.params[11].value, "jj");

		// j section
		if (store.params[4].value) {
			const unstaged: number = 0;
			bank.addKey("adeptstage", 'INT', 4, "j");
			bank.addKey("archonstage", 'INT', 9, "j");
			bank.addKey("dtstage", 'INT', unstaged, "j");
			bank.addKey("dynomito", 'INT', 9, "j"); // voidray
			bank.addKey("elecstage", 'INT', unstaged, "j");
			bank.addKey("goliathstage", 'INT', 10, "j");
			bank.addKey("highstage", 'INT', unstaged, "j");
			bank.addKey("hotshotstage", 'INT', 3, "j"); // colossus
			bank.addKey("hybridstage", 'INT', 9, "j");
			bank.addKey("immostage", 'INT', unstaged, "j");
			bank.addKey("marinestage", 'INT', 9, "j");
			bank.addKey("medicstage", 'INT', 9, "j");
			bank.addKey("paragon", 'INT', unstaged, "j");
			bank.addKey("paragond", 'INT', unstaged, "j");
			bank.addKey("metalmans", 'INT', 9, "j"); // zeloat
			bank.addKey("reaperstage", 'INT', 9, "j");
			bank.addKey("scvstage", 'INT', 9, "j");
			bank.addKey("siegestage", 'INT', unstaged, "j");
			bank.addKey("sniperstage", 'INT', 9, "j");
			bank.addKey("specstage", 'INT', unstaged, "j");
			bank.addKey("stalkerstage", 'INT', 9, "j");
			bank.addKey("tempstage", 'INT', unstaged, "j");
			bank.addKey("thorstage", 'INT', unstaged, "j");
			bank.addKey("vultures", 'INT', 9, "j");

			bank.addKey("KillReducerForBounty", 'FLAG', true, "j");
			bank.addKey("unlockhero", 'FLAG', true, "j");
			bank.addKey("UnlockHydralisk2", 'FLAG', true, "j");
		} else
			bank.removeSection('j');

		// Challenges section
		if (store.params[3].value) {
			const challenges: number = 100;
			bank.addKey("GCLInfantry", 'INT', challenges, "Challenges");
			bank.addKey("GCLTeamGame", 'INT', challenges, "Challenges");
			bank.addKey("GCLConstructor", 'INT', challenges, "Challenges");
			bank.addKey("GCLShieldProblems", 'INT', challenges, "Challenges");
			bank.addKey("GCLNext2Ded", 'INT', challenges, "Challenges");
			bank.addKey("GCLWarpSpeed", 'INT', challenges, "Challenges");
			bank.addKey("GCLTorture", 'INT', challenges, "Challenges");
			bank.addKey("CLEvasive", 'FLAG', true, "Challenges");
		} else
			bank.removeSection('Challenges');

		// Talent Points and PlayerIDNumber Sections
		const points: number = store.params[1].value as number; // 45 000 max
		bank.addKey("PlayerID", 'INT', points * 5, "PlayerIDNumber");

		if (store.params[2].value) {
			this.setTPKey("DamagePoints", 100, points, bank);
			this.setTPKey("MoveSpeedPoints", 10, points, bank);

			this.setTPKey("LifePoints", 100, points, bank);
			this.setTPKey("LifeRegenPoints", 100, points, bank);
			this.setTPKey("LifeArmorBonusPoints", 10, points, bank);
			this.setTPKey("LifeArmorMultiplyPoints", 10, points, bank);

			this.setTPKey("ShieldPoints", 100, points, bank);
			this.setTPKey("ShieldRegenerationPoints", 100, points, bank);
			this.setTPKey("ShieldArmorBonusPoints", 10, points, bank);
			this.setTPKey("ShieldArmorMultiplyPoints", 10, points, bank);

			this.setTPKey("EnergyPoints", 10, points, bank);
			this.setTPKey("EnergyRegenPoints", 10, points, bank);
			this.setTPKey("CooldownPoints", 25, points, bank);

			this.setTPKey("BuildPoints", 25, points, bank);
			this.setTPKey("DamageReductionPoints", 10, points, bank);

			this.setTPKey("MineralStartPoints", 5000, points, bank);
			this.setTPKey("VespeneStartPoints", 500, points, bank);
			this.setTPKey("RespawnSpeedPoints", 20, points, bank);
			this.setTPKey("ExpPoints", 100, points, bank); // ?
			this.setTPKey("MasteryPoints", 100, points, bank); // ?

			const plays: number = 10;
			bank.addKey("Plays", 'INT', plays * (505 - (16 + points)), "TP");
		} else
			bank.removeSection('TP');

		bank.addKey("InfoNumber", 'INT', points * (9999 - (16 + points)), "PlayerIDNumber");

		// sort and update signature
		bank.sort();
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): MParam[] {
		bank.parse(value);
		if (bank.sections.size < 4 || bank.sections.get("jjj") == null || bank.sections.get("jj") == null
			|| bank.sections.get("TP") == null || bank.sections.get("PlayerIDNumber") == null) {
			console.error('Wrong bank file!');
			return null;
		}

		return [
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
		];
	}

	private setTPKey(key: string, value: number, points: number, bank: Bank): void {
		bank.addKey(key, 'INT', value * (999 - (16 + points)), "TP");
	}

}

export default new Functions();