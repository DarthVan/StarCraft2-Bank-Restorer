/* Generated with TypeScript snippets */

import { Bank } from "src/core/bank/bank";
import { SCParam } from "src/core/starcode/sc-param";
import sc from 'src/core/starcode/sc-service';
import store from "./store";

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-02-09
*/

class Functions {

	private readonly STARCODE_KEY: string = 'Ks8N10dj6L3M';

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public generateXML(bank: Bank): string {
		store.updateChecksums(bank.info.getPlayerNumber(), true); // вычисления

		// 1. unit section:
		store.units.forEach((queue: SCParam[], index: number): void => {
			if (queue[0].current > 0) // if unit type != 'empty'
				bank.addKey('0' + (index + 1), 'STRING', sc.write(queue, this.STARCODE_KEY), 'unit');
		});
		bank.addKey('info', 'STRING', sc.write(store.slots, this.STARCODE_KEY), 'unit');

		// 2. account section:
		bank.addKey('info', 'STRING', sc.write(store.info, this.STARCODE_KEY), 'account');
		bank.addKey('camera', 'STRING', sc.write(store.camera, this.STARCODE_KEY), 'account');
		bank.addKey('set2', 'STRING', sc.write(store.set2, this.STARCODE_KEY), 'account');

		// 3. sort and signature
		bank.sort();
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): { info?: SCParam[], units?: SCParam[][] } {
		// 1. validate
		bank.parse(value);
		if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null) {
			console.error('wrong bank file!');
			return null;
		}

		// 2. unit section
		const units: SCParam[][] = [];
		for (let i: number = 0; i < 8; i++)
			units.push([...store.units[i]]);

		for (let i: number = 0; i < 8; i++) {
			const code: string = bank.getKey('0' + (i + 1), 'unit')?.value;
			if (code)
				sc.read(code, units[i], this.STARCODE_KEY);
			else
				units[i][0].update(0); // type = 0 = empty slot
		}

		// 3. account section
		const info: SCParam[] = [...store.info];
		sc.read(bank.getKey('info', 'account').value, info, this.STARCODE_KEY);

		return { info, units };
	}

}

export default new Functions();