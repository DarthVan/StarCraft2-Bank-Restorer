/* Generated with TypeScript snippets */

import { Bank, BankKey } from '@src/core/bank';
import { sc2_StringWord } from '@src/core/sc2';
import { MParam } from '../MParam';
import { lib1_gf_ECBDecrypt, lib1_gf_ECBEncrypt, lib1_gf_InitAESEncryption } from './crypto';
import store from './store';

/** Functions **
* ...
* @Author Star Noob
* @Created 2024-01-14
*/

class Functions {

  constructor() {
    lib1_gf_InitAESEncryption();
  }

  //-------------------------------------------------- PUBLIC ---------------------------------------------------

  public generateXML(bank: Bank): string {

    // Resources:
    let cryptedResources: string = '';
    const count: number = 9;
    for (let i: number = 0; i < count; i++)
      cryptedResources += lib1_gf_ECBEncrypt(String(store.resources[i].value)) + ' ';

    bank.addKey('R', 'STRING', cryptedResources, 'R');

    //bank.updateSignature();
    //console.log('bank const updated:', bank.signature);
    return bank.getAsString();
  }

  public parse(bank: Bank, value: string): MParam[] {
    bank.parse(value);
    if (!bank.getKey('R', 'R')) {
      console.error('Wrong bank file!');
      return null;
    }

    const res: number[] = [];
    const cryptedResources: string = bank.getKey('R', 'R').value;
    const count: number = 9;
    for (let i: number = 0; i < count; i++) {
      const word: string = sc2_StringWord(cryptedResources, i);
      if (word != '')
        res.push(parseInt(lib1_gf_ECBDecrypt(word) || '0'));
    }

    return [
      { type: 'number', value: res[0], description: 'Vanadium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[1], description: 'Chromium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[2], description: 'Titanium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[3], description: 'Tungsten', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[4], description: 'Gold', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[5], description: 'Noobium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[6], description: 'Osmium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[7], description: 'Iridium', min: 0, max: 10000000, tip: '0 - 10000000' },
      { type: 'number', value: res[8], description: 'Palladium', min: 0, max: 10000000, tip: '0 - 10000000' }
    ];
  }

}

export default new Functions();