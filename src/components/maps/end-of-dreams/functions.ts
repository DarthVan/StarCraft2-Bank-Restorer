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

    // Rank:
    bank.addKey('Rank', 'STRING', store.params[0].value, 'Ranks');

    // Stats:
    bank.addKey('TotalKills', 'INT', store.params[1].value, 'Stats');
    bank.addKey('Score', 'INT', store.params[2].value, 'Stats');

    bank.addKey('EasyWins', 'INT', store.params[3].value, 'Stats');
    bank.addKey('MediumWins', 'INT', store.params[4].value, 'Stats');
    bank.addKey('HardWins', 'INT', store.params[5].value, 'Stats');
    bank.addKey('HellWins', 'INT', store.params[6].value, 'Stats');

    // Checksum:
    const checksum: number =
      (
        (store.params[3].value as number ^ 1) +
        (store.params[4].value as number ^ 2) + // (1<<1) = 2
        (store.params[5].value as number ^ 1) +
        (store.params[6].value as number ^ 1)
      ) % 99;

    bank.addKey('Sum', 'INT', checksum, 'Check');

    bank.updateSignature();
    //console.log('bank const updated:', bank.signature);
    return bank.getAsString();
  }

  public parse(bank: Bank, value: string): MParam[] {
    bank.parse(value);
    if (bank.sections.size != 3 || bank.sections.get('Stats') == null || bank.sections.get('Ranks') == null) {
      console.error('Wrong bank file!');
      return null;
    }

    return [
      { type: 'string', value: bank.getKey('Rank', 'Ranks').value, description: 'Rank' },

      { type: 'number', value: this.getKey(bank, 'TotalKills'), description: 'Total Kills', min: 0, max: 9999999, tip: '0 - 9999999' },
      { type: 'number', value: this.getKey(bank, 'Score'), description: 'Score', min: 0, max: 9999999, tip: '0 - 9999999' },

      { type: 'number', value: this.getKey(bank, 'EasyWins'), description: 'Easy Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
      { type: 'number', value: this.getKey(bank, 'MediumWins'), description: 'Medium Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
      { type: 'number', value: this.getKey(bank, 'HardWins'), description: 'Hard Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
      { type: 'number', value: this.getKey(bank, 'HellWins'), description: 'Hell Wins', min: 0, max: 9999999, tip: '0 - 9999999' },
    ];
  }

  private getKey(bank: Bank, key: string, section: string = 'Stats'): number {
    const k: BankKey = bank.getKey(key, section);
    if (!k)
      return 0;
    return parseInt(k.value);
  }

}

export default new Functions();