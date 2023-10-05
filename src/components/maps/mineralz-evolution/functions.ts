/* Generated with TypeScript snippets */

import { Bank, BankKey } from '@src/core/bank';
import { sc2_div, sc2_modf, sc2_mult, sc2_round, sc2_sqrt } from '@src/core/sc2';
import { r } from '@src/utils/utils';
import { MParam } from '../MParam';
import store from './store';

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-01-28
*/

class Functions {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public generateXML(bank: Bank): string {

		// JESUS!!! GOD! WHY SO MANY STUPID OPERATIONS ??
		/* const i1: number = sc2_mult(sc2_modf(86.2, sc2_sqrt(5)), 47.42);

		const i2: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(
						1229.3,
						sc2_sqrt(i1)
					),
					sc2_modf(1229.3, sc2_sqrt(5))
				)
			), 2);

		const i3: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(9139.1, sc2_sqrt(i2)),
					sc2_modf(9139.1, sc2_sqrt(i1)),
					sc2_modf(9139.1, sc2_sqrt(5)),
				)
			), 2);

		const i4: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(12213.1, sc2_sqrt(i3)),
					sc2_modf(12213.1, sc2_sqrt(i2)),
					sc2_modf(12213.1, sc2_sqrt(i1)),
					sc2_modf(12213.1, sc2_sqrt(5)),
				)
			), 2);

		const i5: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(113.1, sc2_sqrt(i4)),
					sc2_modf(113.1, sc2_sqrt(i3)),
					sc2_modf(113.1, sc2_sqrt(i2)),
					sc2_modf(113.1, sc2_sqrt(i1)),
					sc2_modf(113.1, sc2_sqrt(5)),
				)
			), 2);

		const i6: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(678.9, sc2_sqrt(i5)),
					sc2_modf(678.9, sc2_sqrt(i4)),
					sc2_modf(678.9, sc2_sqrt(i3)),
					sc2_modf(678.9, sc2_sqrt(i2)),
					sc2_modf(678.9, sc2_sqrt(i1)),
					sc2_modf(678.9, sc2_sqrt(5))
				)
			), 2);

		const i7: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(422.4, sc2_sqrt(i6)),
					sc2_modf(422.4, sc2_sqrt(i5)),
					sc2_modf(422.4, sc2_sqrt(i4)),
					sc2_modf(422.4, sc2_sqrt(i3)),
					sc2_modf(422.4, sc2_sqrt(i2)),
					sc2_modf(422.4, sc2_sqrt(i1)),
					sc2_modf(422.4, sc2_sqrt(5))
				)
			), 2);

		const i8: number = sc2_mult(
			sc2_round(
				sc2_mult(
					sc2_modf(397.4, sc2_sqrt(i7)),
					sc2_modf(397.4, sc2_sqrt(i6)),
					sc2_modf(397.4, sc2_sqrt(i5)),
					sc2_modf(397.4, sc2_sqrt(i4)),
					sc2_modf(397.4, sc2_sqrt(i3)),
					sc2_modf(397.4, sc2_sqrt(i2)),
					sc2_modf(397.4, sc2_sqrt(i1)),
					sc2_modf(397.4, sc2_sqrt(5))
				)
			), 2);

		const i9: number = sc2_round(
			sc2_mult(
				sc2_modf(333.22, sc2_sqrt(i7)),
				sc2_modf(333.22, sc2_sqrt(i6)),
				sc2_modf(333.22, sc2_sqrt(i5)),
				sc2_modf(333.22, sc2_sqrt(i4)),
				sc2_modf(333.22, sc2_sqrt(i3)),
				sc2_modf(333.22, sc2_sqrt(i2)),
				sc2_modf(333.22, sc2_sqrt(i1)),
				sc2_modf(333.22, sc2_sqrt(5))
			)
		); */

		//console.log('calcs:', i1, i2, i3, i4, i5, i6, i7, i8, i9);
		// 58.70751953125 12 22 2 26 18 40 662 1

		const i1: number = 58.70751953125;
		const i2: number = 12;
		const i3: number = 22;
		const i4: number = 2;
		const i5: number = 26;
		const i6: number = 18;
		const i7: number = 40;
		const i8: number = 662;
		const i9: number = 1;

		//handle = StringToInt(StringReplace('2-S2-1-10376898', "0", 1, 8));
		const handle: number = parseInt(bank.info.playerID.substring(8)); // apha :D

		// 1. Prestige:
		const prestige: number = store.params[0].value as number;
		if (prestige > 0) {
			bank.addKey('PHR', 'INT', prestige, 'Sec');
			let comp: number = 0;

			for (let i: number = 0; i < prestige; i++)
				comp = (comp + 39.0) * 1.2;

			bank.addKey('PR', 'FIXED', comp, 'Sec');
		} else {
			bank.removeKey('PR', 'Sec');
			bank.removeKey('PHR', 'Sec');
		}

		// 2. level and exp:
		const level: number = store.params[1].value as number;
		bank.addKey('NIVO', 'FIXED', level, 'Sec');
		bank.addKey('NIVEXP', 'FIXED', level * 1224.0, 'Sec');
		bank.addKey('EXPP', 'FIXED', r(1, 25) * level, 'Sec'); // ?

		// 3. Wins:
		const wins: number = store.params[2].value as number;
		bank.addKey('WINS', 'FIXED', wins, 'Sec');

		// 4. Nights ?
		const nights: number = store.params[3].value as number;
		if (nights > 0) {
			bank.addKey('NIGHTMNHD', 'FIXED', nights, 'Sec');
			bank.addKey('KILLED', 'FIXED', nights * 4788.0, 'Sec');

			// 36 nights completed
			if (nights >= 35)
				bank.addKey('ZUHIB', 'FIXED', 121186.0, 'Sec');
			else
				bank.removeKey('ZUHIB', 'Sec');
		} else {
			bank.removeKey('NIGHTMNHD', 'Sec');
			bank.removeKey('KILLED', 'Sec');
			bank.removeKey('ZUHIB', 'Sec');
		}

		// 5. Elites
		const elite: number = store.params[4].value as number;
		if (elite > 0) {
			bank.addKey('NIGHTELITE', 'FIXED', elite, 'Sec');
			if (elite >= 35)
				bank.addKey('HEAL', 'FIXED', 21634, 'Sec');
		} else {
			bank.removeKey('NIGHTELITE', 'Sec');
			bank.removeKey('HEAL', 'Sec');
		}

		// 6. Nightmares
		const nightmare: number = store.params[5].value as number;
		if (nightmare > 0) {
			bank.addKey('NIGHTNMAR', 'FIXED', nightmare, 'Sec');
			bank.addKey('XPNB', 'FIXED', nightmare * 1655, 'Sec');
			if (nightmare >= 35)
				bank.addKey('XPNQ', 'FIXED', 59120, 'Sec');
		} else {
			bank.removeKey('NIGHTNMAR', 'Sec');
			bank.removeKey('XPNB', 'Sec');
			bank.removeKey('XPNQ', 'Sec');
		}

		// 7. Hell
		const hell: number = store.params[6].value as number;
		if (hell > 0) {
			bank.addKey('HL', 'FIXED', hell, 'Sec');
			bank.addKey('HAL', 'FIXED', hell * 1631, 'Sec');
			if (hell >= 35)
				bank.addKey('HLO', 'FIXED', 25265, 'Sec');
		} else {
			bank.removeKey('HL', 'Sec');
			bank.removeKey('HAL', 'Sec');
			bank.removeKey('HLO', 'Sec');
		}

		// 8. Impossible:
		const impossible: number = store.params[7].value as number;
		if (impossible > 0) {
			bank.addKey('ims', 'INT', impossible, 'Sec');

			//const shield: number = Math.abs(sc2_modf(impossible * 10.0, Math.abs(sc2_modf(sc2_div(sc2_round((sc2_modf((sc2_modf(i1, sc2_sqrt(5.0)) * sc2_modf(86, sc2_sqrt(8.0)) * sc2_modf(i2, sc2_sqrt(3.0)) * sc2_modf(i3, sc2_sqrt(2.0)) * sc2_modf(i4, sc2_sqrt(7.0)) * sc2_modf(i5, sc2_sqrt(3.0)) * sc2_modf(i6, sc2_sqrt(6.0)) * sc2_modf(i7, sc2_sqrt(7.0)) * sc2_modf(i8, sc2_sqrt(5.0)) * sc2_modf(i9, sc2_sqrt(3.0)) * sc2_modf(handle, 65537.0)), sc2_sqrt(3.0)) * 10000.0)), 1000.0), 10.0))));
			const shield: number = Math.abs(
				sc2_modf(
					sc2_mult(impossible, 10.0),
					Math.abs(
						sc2_modf(
							sc2_div(
								sc2_round(
									sc2_mult(
										sc2_modf(
											sc2_mult(
												sc2_modf(i1, sc2_sqrt(5.0)),
												sc2_modf(86, sc2_sqrt(8.0)),
												sc2_modf(i2, sc2_sqrt(3.0)),
												sc2_modf(i3, sc2_sqrt(2.0)),
												sc2_modf(i4, sc2_sqrt(7.0)),
												sc2_modf(i5, sc2_sqrt(3.0)),
												sc2_modf(i6, sc2_sqrt(6.0)),
												sc2_modf(i7, sc2_sqrt(7.0)),
												sc2_modf(i8, sc2_sqrt(5.0)),
												sc2_modf(i9, sc2_sqrt(3.0)),
												sc2_modf(handle, 65537.0)
											),
											sc2_sqrt(3.0)
										), 10000.0
									)
								), 1000.0
							), 10.0
						)
					)
				)
			);

			bank.addKey('im', 'FIXED', sc2_mult(shield + impossible, 10), 'Sec'); //(lv_shield+IntToFixed(lv_nim*10))); // "im"
			if (impossible >= 35) {
				//const heal: number = sc2_div(sc2_round((sc2_modf((sc2_modf(i1, sc2_sqrt(3.0)) * sc2_modf(86, sc2_sqrt(2.0)) * sc2_modf(i2, sc2_sqrt(7.0)) * sc2_modf(i3, sc2_sqrt(8.0)) * sc2_modf(i4, sc2_sqrt(17.0)) * sc2_modf(i5, sc2_sqrt(3.0)) * sc2_modf(i6, sc2_sqrt(2.0)) * sc2_modf(i7, sc2_sqrt(5.0)) * sc2_modf(i8, sc2_sqrt(11.0)) * sc2_modf(i9, sc2_sqrt(5.0)) * sc2_modf(handle, 65537.0)), sc2_sqrt(10.0)) * 10000.0)), 1000.0);
				const heal: number = sc2_div(
					sc2_round(
						sc2_mult(
							sc2_modf(
								sc2_mult(
									sc2_modf(i1, sc2_sqrt(3.0)),
									sc2_modf(86, sc2_sqrt(2.0)),
									sc2_modf(i2, sc2_sqrt(7.0)),
									sc2_modf(i3, sc2_sqrt(8.0)),
									sc2_modf(i4, sc2_sqrt(17.0)),
									sc2_modf(i5, sc2_sqrt(3.0)),
									sc2_modf(i6, sc2_sqrt(2.0)),
									sc2_modf(i7, sc2_sqrt(5.0)),
									sc2_modf(i8, sc2_sqrt(11.0)),
									sc2_modf(i9, sc2_sqrt(5.0)),
									sc2_modf(handle, 65537.0)
								),
								sc2_sqrt(10.0)
							), 10000.0
						)
					),
					1000.0
				);

				bank.addKey('is', 'FIXED', sc2_mult(sc2_div(shield, heal), 3.4), 'Sec');

				// Impossible done key
				//const healval: number = sc2_div(sc2_round((sc2_modf((sc2_modf(i1, sc2_sqrt(2.0)) * sc2_modf(86, sc2_sqrt(3.0)) * sc2_modf(i2, sc2_sqrt(6.0)) * sc2_modf(i3, sc2_sqrt(5.0)) * sc2_modf(i4, sc2_sqrt(7.0)) * sc2_modf(i5, sc2_sqrt(3.0)) * sc2_modf(i6, sc2_sqrt(2.0)) * sc2_modf(i7, sc2_sqrt(5.0)) * sc2_modf(i8, sc2_sqrt(11.0)) * sc2_modf(i9, sc2_sqrt(5.0)) * sc2_modf(handle, 65537.0)), sc2_sqrt(10.0)) * 10000.0)), 1000.0);
				const healval: number = sc2_div(
					sc2_round(
						sc2_mult(
							sc2_modf(
								sc2_mult(
									sc2_modf(i1, sc2_sqrt(2.0)),
									sc2_modf(86, sc2_sqrt(3.0)),
									sc2_modf(i2, sc2_sqrt(6.0)),
									sc2_modf(i3, sc2_sqrt(5.0)),
									sc2_modf(i4, sc2_sqrt(7.0)),
									sc2_modf(i5, sc2_sqrt(3.0)),
									sc2_modf(i6, sc2_sqrt(2.0)),
									sc2_modf(i7, sc2_sqrt(5.0)),
									sc2_modf(i8, sc2_sqrt(11.0)),
									sc2_modf(i9, sc2_sqrt(5.0)),
									sc2_modf(handle, 65537.0)
								), sc2_sqrt(10.0)
							), 10000.0
						)
					), 1000.0);

				bank.addKey('imval', 'FIXED', healval, 'Sec');
			} else {
				bank.removeKey('is', 'Sec');
				bank.removeKey('imval', 'Sec');
			}
		} else {
			bank.removeKey('ims', 'Sec');
			bank.removeKey('im', 'Sec');
			bank.removeKey('is', 'Sec');
			bank.removeKey('imval', 'Sec');
		}

		// 9. Roles:
		const wall: number = store.params[8].value as number;
		if (wall > 0)
			bank.addKey('a', 'INT', wall * 4, 'Sec');
		else
			bank.removeKey('a', 'Sec');

		const cannons: number = store.params[9].value as number;
		if (cannons > 0)
			bank.addKey('e', 'INT', cannons * 7, 'Sec');
		else
			bank.removeKey('e', 'Sec');

		const healer: number = store.params[10].value as number;
		if (healer > 0)
			bank.addKey('i', 'INT', healer * 9, 'Sec');
		else
			bank.removeKey('i', 'Sec');

		const generator: number = store.params[11].value as number;
		if (generator > 0)
			bank.addKey('f', 'INT', generator * 5, 'Sec');
		else
			bank.removeKey('f', 'Sec');

		const economy: number = store.params[12].value as number;
		if (economy > 0)
			bank.addKey('o', 'INT', economy * 13, 'Sec');
		else
			bank.removeKey('o', 'Sec');

		// 10. Easy:
		bank.addKey('EASY', 'FIXED', 35, 'Sec');

		// Version:
		bank.addKey('VERSION', 'FIXED', 6.0, 'Sec');

		// ???
		/* const codid: number = r(100000, 500000);
		bank.addKey('CODID', 'FIXED', codid, 'Sec');
		bank.addKey('DMGX', 'FIXED', codid - 44444, 'Sec');
		bank.addKey('NRJY', 'FIXED', codid - 79999, 'Sec'); */

		bank.updateSignature();
		//console.log('bank const updated:', bank.signature);
		return bank.getAsString();
	}

	public parse(bank: Bank, value: string): MParam[] {
		bank.parse(value);
		if (bank.sections.size != 1 || bank.sections.get('Sec') == null) {
			console.error('Wrong bank file!');
			return null;
		}

		return [
			{ type: 'number', value: this.getKey(bank, 'PHR'), description: 'Prestige', min: 0, max: 40, tip: '0 - 40' },
			{ type: 'number', value: this.getKey(bank, 'NIVO'), description: 'Level', min: 1, max: 200, tip: '1 - 200' },
			{ type: 'number', value: this.getKey(bank, 'WINS'), description: 'Wins', min: 0, max: 999999 },

			{ type: 'number', value: this.getKey(bank, 'NIGHTMNHD'), description: 'Nights', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: this.getKey(bank, 'NIGHTELITE'), description: 'Elite', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: this.getKey(bank, 'NIGHTNMAR'), description: 'Nightmare', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: this.getKey(bank, 'HL'), description: 'Hell', min: 0, max: 35, tip: '0 - 35' },
			{ type: 'number', value: this.getKey(bank, 'ims'), description: 'Impossible', min: 0, max: 35, tip: '0 - 35' },

			{ type: 'number', value: this.getKey(bank, 'a') / 4, description: 'Wall', min: 0, max: 999999 }, // 8
			{ type: 'number', value: this.getKey(bank, 'e') / 7, description: 'Cannons', min: 0, max: 999999 },
			{ type: 'number', value: this.getKey(bank, 'i') / 9, description: 'Healer', min: 0, max: 999999 },
			{ type: 'number', value: this.getKey(bank, 'f') / 5, description: 'Generator', min: 0, max: 999999 },
			{ type: 'number', value: this.getKey(bank, 'o') / 13, description: 'Economy', min: 0, max: 999999 }
		];
	}

	private getKey(bank: Bank, key: string): number {
		const k: BankKey = bank.getKey(key, 'Sec');
		if (!k)
			return 0;
		return parseInt(k.value);
	}

}

export default new Functions();