/* Generated with TypeScript snippets */

import { Bank, BankKey } from '@src/core/bank';
import { sc2_div, sc2_modf, sc2_mult, sc2_round, sc2_sqrt } from '@src/core/sc2';
import item from '@src/modules/accounts/item';
import { r } from '@src/utils/utils';
import { MParam } from '../MParam';
import store from './store';

/** Functions **
* ...
* @Author Star Noob
* @Created 2023-10-01
*/

class Functions {

  // who use these indexes, that cheater :D
  private _skipItemIndexes: Set<number> = new Set<number>([
    3, 4, 6, 7, 10, 11, 14, 15, 16, 17, 23, 26, 30, 31, 34, 35, 36, 37, 46, 47,
    48, 49, 50, 57, 58, 59, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
    81, 82, 83, 84, 90, 91, 92, 93, 94, 116, 117, 118, 119, 121, 122, 123, 130, 131, 132, 133,
    138, 139, 140, 142, 149, 150, 151, 152, 153, 155, 156, 157, 158, 160, 161, 162, 169, 177, 178, 179,
    180, 185, 186, 197, 217, 218, 219, 226, 227, 228, 236, 237, 243, 244, 245, 248, 249, 250, 257, 258,
    259, 260, 270, 271, 272, 273, 274, 278, 279, 289, 292, 293, 296, 297, 301, 302, 303, 304, 307, 308,
    309, 313, 314, 322, 323, 325, 326, 338, 339, 340, 341, 344, 345, 346, 349, 350, 355, 356, 357, 358,
    362, 363, 364, 368, 369, 375, 376, 377, 378, 386, 387, 388, 389, 395, 396, 397, 398, 399, 401, 402,
    411, 412, 416, 417, 420, 422, 423, 432, 435, 436, 437, 438, 441, 446, 447, 449, 453, 454, 461, 462,
    463, 469, 470, 471, 478, 479, 480, 489, 490, 495, 496, 498, 499, 500, 505, 506, 515, 516, 517, 520,
    522, 525, 526, 543, 544, 545, 546, 547, 549, 550
  ]);

  //-------------------------------------------------- PUBLIC ---------------------------------------------------

  public generateXML(bank: Bank): string {

    // cheats detected:

    // 1. must be equal
    // const gv_accountConquest = BankValueGetAsString(BankLastCreated(), "tssplayers", "tssconquest");
    // const gv_vccfdd3244 = BankValueGetAsString(BankLastCreated(), "tssplayers", "vccfdd3244");



    bank.addKey('VERSION', 'FIXED', 6.0, 'tsslevels');



    bank.updateSignature();
    //console.log('bank const updated:', bank.signature);
    return bank.getAsString();
  }

  public parse(bank: Bank, value: string): MParam[] {
    bank.parse(value);
    if (bank.sections.size != 1 || bank.sections.get('tsslevels') == null) {
      console.error('Wrong bank file!');
      return null;
    }

    return [
      /* { type: 'number', value: this.getKey(bank, 'PHR'), description: 'Prestige', min: 0, max: 40, tip: '0 - 40' },
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
      { type: 'number', value: this.getKey(bank, 'o') / 13, description: 'Economy', min: 0, max: 999999 } */
    ];
  }

  private getKey(bank: Bank, key: string): number {
    const k: BankKey = bank.getKey(key, 'tsslevels');
    if (!k)
      return 0;
    return parseInt(k.value);
  }

  // need special indexm, or function that generate uncheated indexes to sotore legit values
  private getIndexFor(p: any): number {
    return 0;
  }




  private insertItems(bank: Bank, items: any[]): void {

    const tempItems: any[] = [...items];

    for (let i: number = 0; i < 550; i++) {
      if (this._skipItemIndexes.has(i))
        continue;
      const item: any = tempItems.shift();
      bank.addKey('tsssecretitem' + (i + 1), 'INT', item.value, 'tsslevels');
      bank.addKey('sdasdi19028' + (i + 1), 'INT', item.value, 'tsslevels');
    }

  }

}

export default new Functions();