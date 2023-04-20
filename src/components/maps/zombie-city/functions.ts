/* Generated with TypeScript snippets */

import { Bank } from "src/core/bank/bank";
import { SCParam } from "src/core/starcode/sc-param";
import sc from "src/core/starcode/sc-service";
import store from "./store";

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	private readonly STARCODE_KEY: string = 'OnFbXRyxYzPuv7of(v5v7[zdvUiDzXO]gVb9FVI9b>M>l}Gt6L';
	private readonly SECTION: string = '23EGWEG234AG4';
	private readonly KEY: string = 'AWEO322AOIGWE3wqogej23';

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public generateXML(bank: Bank): string {
		bank.addKey(this.KEY, 'STRING', sc.write(store.queue, this.STARCODE_KEY), this.SECTION);
		bank.updateSignature();
		//console.log("bank const updated:", bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): SCParam[] {
		bank.parse(value);
		if (bank.sections.size != 1 || bank.sections.get(this.SECTION) == null) {
			console.error('Wrong bank file!');
			return null;
		}

		const code: string = bank.sections.get(this.SECTION).get(this.KEY).value;
		const queue: SCParam[] = [...store.queue];
		sc.read(code, queue, this.STARCODE_KEY); // тут мутируется, так что делаем через новый массив
		return queue;
	}

}

export default new Functions();