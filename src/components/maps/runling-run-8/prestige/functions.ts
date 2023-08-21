/* Generated with TypeScript snippets */

import { Bank } from '@src/core/bank';
import store from './store';

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-02-09
*/

class Functions {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public generateXML(bank: Bank): string {
		bank.addKey('Active', 'STRING', store.active ? '1' : '0', 'HUD');
		bank.addKey('Hide', 'STRING', store.hide ? '1' : '0', 'HUD');
		//bank.sort();
		//bank.updateSignature();

		//console.log('bank const updated:', bank.getAsString());
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): { active: boolean, hide: boolean } {
		// 1. validate
		bank.parse(value);
		if (bank.sections.size != 1 || bank.sections.get('HUD') == null)
			throw new Error('Wrong bank file!');

		// 2. update params
		const active: boolean = bank.getKey('Active', 'HUD').value == '1';
		const hide: boolean = bank.getKey('Hide', 'HUD').value == '1';

		// 3. result
		return { active, hide };
	}

}

export default new Functions();