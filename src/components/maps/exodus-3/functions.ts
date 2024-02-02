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
    const unlockAll: boolean = store.options[0].value as boolean;
    const prestigeAll: boolean = store.options[1].value as boolean;
    const overloadAll: boolean = store.options[2].value as boolean;

    let cryptedString: string;
    let count: number;
    let i: number;

    // Resources:
    cryptedString = '';
    count = 9;
    for (i = 0; i < count; i++)
      cryptedString += lib1_gf_ECBEncrypt(String(store.resources[i].value)) + ' ';
    bank.addKey('R', 'STRING', cryptedString, 'R');

    // Weapons:
    cryptedString = '';
    count = 18;
    if (unlockAll) {
      for (i = 0; i < count; i++)
        cryptedString += lib1_gf_ECBEncrypt(String(i + 1)) + ' ';
      bank.addKey('U', 'STRING', cryptedString, 'W');
      bank.addKey('V', 'STRING', cryptedString, 'W');
    }

    if (unlockAll) {
      cryptedString = lib1_gf_ECBEncrypt(String(0)) + ' '; // Equipped type (15)
      bank.addKey('E', 'STRING', cryptedString, 'W');
    }

    for (i = 0; i < count; i++) {
      cryptedString = '';

      if (prestigeAll) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Prestige
      } else {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(1)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Prestige
      }

      // overload stats
      if (overloadAll && i == 0) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // Damage points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Light points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Armored points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Massive points
        cryptedString += lib1_gf_ECBEncrypt(String(30)) + ' '; // Period points
        cryptedString += lib1_gf_ECBEncrypt(String(50)) + ' '; // Range points
        cryptedString += lib1_gf_ECBEncrypt(String(3)) + ' '; // Burst points
        cryptedString += lib1_gf_ECBEncrypt(String(5)) + ' '; // Burst period points
        cryptedString += lib1_gf_ECBEncrypt(String(50)) + ' '; // Move speed points
      } else {
        for (let j: number = 0; j < 9; j++)
          cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // other points
      }

      bank.addKey(String(i), 'STRING', cryptedString, 'W');
    }

    // Armors:
    cryptedString = '';
    count = 11;
    if (unlockAll) {
      for (i = 0; i < count; i++)
        cryptedString += lib1_gf_ECBEncrypt(String(i + 1)) + ' ';
      bank.addKey('U', 'STRING', cryptedString, 'PA');
      bank.addKey('V', 'STRING', cryptedString, 'PA');
    }

    if (unlockAll) {
      cryptedString = lib1_gf_ECBEncrypt(String(0)) + ' '; // Equipped type (10)
      bank.addKey('E', 'STRING', cryptedString, 'PA');
    }

    for (i = 0; i < count; i++) {
      cryptedString = '';

      if (prestigeAll) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Prestige
      } else {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(1)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Prestige
      }

      // overload stats
      if (overloadAll && i == 0) {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Life points
        cryptedString += lib1_gf_ECBEncrypt(String(998)) + ' '; // Armor points
        cryptedString += lib1_gf_ECBEncrypt(String(100)) + ' '; // Regeneration points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Shield points
        cryptedString += lib1_gf_ECBEncrypt(String(50)) + ' '; // Shield regeneration points
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Energy points
        cryptedString += lib1_gf_ECBEncrypt(String(100)) + ' '; // Energy regen points
        cryptedString += lib1_gf_ECBEncrypt(String(500)) + ' '; // Ability power points
        cryptedString += lib1_gf_ECBEncrypt(String(100)) + ' '; // Move speed points
      } else {
        for (let j: number = 0; j < 9; j++)
          cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // other points
      }

      bank.addKey(String(i), 'STRING', cryptedString, 'PA');
    }

    // Tools:
    cryptedString = '';
    count = 5;
    if (unlockAll) {
      for (i = 0; i < count; i++)
        cryptedString += lib1_gf_ECBEncrypt(String(i + 1)) + ' ';
      bank.addKey('U', 'STRING', cryptedString, 'TO');
      bank.addKey('V', 'STRING', cryptedString, 'TO');
    }

    if (unlockAll) {
      cryptedString = lib1_gf_ECBEncrypt(String(0)) + ' '; // Equipped type
      bank.addKey('E', 'STRING', cryptedString, 'TO');
    }

    for (i = 0; i < count; i++) {
      cryptedString = '';

      if (prestigeAll) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Prestige
      } else {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(1)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Prestige
      }

      // overload stats
      if (overloadAll && i == 0) {
        cryptedString += lib1_gf_ECBEncrypt(String(500)) + ' '; // Damage points
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Period points
        cryptedString += lib1_gf_ECBEncrypt(String(40)) + ' '; // Range points
        cryptedString += lib1_gf_ECBEncrypt(String(200)) + ' '; // Repair speed points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Repair range points
        cryptedString += lib1_gf_ECBEncrypt(String(7)) + ' '; // repair cost points
      } else {
        for (let j: number = 0; j < 6; j++)
          cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // other points
      }

      bank.addKey(String(i), 'STRING', cryptedString, 'TO');
    }

    // Turrets:
    cryptedString = '';
    count = 18;
    if (unlockAll) {
      for (i = 0; i < count; i++)
        cryptedString += lib1_gf_ECBEncrypt(String(i + 1)) + ' ';
      bank.addKey('U', 'STRING', cryptedString, 'T');
      bank.addKey('V', 'STRING', cryptedString, 'T');
    }

    if (unlockAll) {
      cryptedString = '';
      cryptedString += lib1_gf_ECBEncrypt(String(15)) + ' '; // Equipped 1  (15)
      cryptedString += lib1_gf_ECBEncrypt(String(14)) + ' '; // Equipped 2
      cryptedString += lib1_gf_ECBEncrypt(String(16)) + ' '; // Equipped 3
      cryptedString += lib1_gf_ECBEncrypt(String(7)) + ' '; // Equipped 4
      cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Equipped 5
      bank.addKey('E', 'STRING', cryptedString, 'T');
    }

    for (i = 0; i < count; i++) {
      cryptedString = '';

      if (prestigeAll) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Prestige
      } else {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(1)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Prestige
      }

      // overload stats
      if (overloadAll && i == 0) {
        cryptedString += lib1_gf_ECBEncrypt(String(15)) + ' '; // Life points
        cryptedString += lib1_gf_ECBEncrypt(String(99)) + ' '; // Armor points
        cryptedString += lib1_gf_ECBEncrypt(String(990)) + ' '; // Damage points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Light points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Armored points
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // vs Massive points
        /* if (i == 3 || i == 7 || i == 11) { // fire turrets
          cryptedString += lib1_gf_ECBEncrypt(String(30)) + ' '; // Period points
          cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Range points
        } else if (i == 13 || i == 14 || i == 15) { // gun turrets
          cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Period points
          cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Range points
        } else {
          cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Period points
          cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Range points
        } */
        cryptedString += lib1_gf_ECBEncrypt(String(33)) + ' '; // Period points
        cryptedString += lib1_gf_ECBEncrypt(String(22)) + ' '; // Range points
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Costs points
      } else {
        for (let j: number = 0; j < 9; j++)
          cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // other points
      }

      bank.addKey(String(i), 'STRING', cryptedString, 'T');
    }

    // Structures:
    cryptedString = '';
    count = 22;
    if (unlockAll) {
      for (i = 0; i < count; i++)
        cryptedString += lib1_gf_ECBEncrypt(String(i + 1)) + ' ';
      bank.addKey('U', 'STRING', cryptedString, 'S');
      bank.addKey('V', 'STRING', cryptedString, 'S');
    }

    if (unlockAll) {
      cryptedString = '';
      cryptedString += lib1_gf_ECBEncrypt(String(18)) + ' '; // Big wall
      cryptedString += lib1_gf_ECBEncrypt(String(15)) + ' '; // Sensor Pylon
      cryptedString += lib1_gf_ECBEncrypt(String(12)) + ' '; // Energizer T3
      cryptedString += lib1_gf_ECBEncrypt(String(5)) + ' '; // Healer T2
      cryptedString += lib1_gf_ECBEncrypt(String(11)) + ' '; // Teleport
      cryptedString += lib1_gf_ECBEncrypt(String(21)) + ' '; // Mine
      bank.addKey('E', 'STRING', cryptedString, 'S');
    }

    cryptedString = lib1_gf_ECBEncrypt(String(0)) + ' '; // Supply equipped
    bank.addKey('SE', 'STRING', cryptedString, 'S');

    for (i = 0; i < count; i++) {
      cryptedString = '';

      if (prestigeAll) {
        cryptedString += lib1_gf_ECBEncrypt(String(550)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(10)) + ' '; // Prestige
      } else {
        cryptedString += lib1_gf_ECBEncrypt(String(20)) + ' '; // ModPoints
        cryptedString += lib1_gf_ECBEncrypt(String(1)) + ' '; // Level
        cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // Prestige
      }

      // overload stats (3 - 9)
      if (overloadAll && i == 0) {
        for (let j: number = 0; j < 9; j++) {
          let value: number = 15;
          /*if (j == 1) value = 19; // armor
          if (j == 4) value = 30;
          if (j == 6) value = 7;
           if (i == 5 && (j == 3 || j == 4)) value = 60; // repair tower regen and healing
          if (i == 14 && j == 2) value = 30; // supplyNode capacity
          if (i == 21 && j == 2) value = 18; // deep mine harvest time */
          cryptedString += lib1_gf_ECBEncrypt(String(value)) + ' '; // other points
        }
      } else {
        for (let j: number = 0; j < 9; j++)
          cryptedString += lib1_gf_ECBEncrypt(String(0)) + ' '; // other points
      }

      bank.addKey(String(i), 'STRING', cryptedString, 'S');
    }

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

    let result: number[];
    let crypted: string;
    let count: number;
    let i: number;

    // Resources:
    result = [];
    crypted = bank.getKey('R', 'R').value;
    count = 9;
    for (i = 0; i < count; i++) {
      const word: string = sc2_StringWord(crypted, i);
      if (word != '')
        result.push(parseInt(lib1_gf_ECBDecrypt(word) || '0'));
      else
        result.push(0);
    }

    // Weapons:
    crypted = bank.getKey('E', 'W').value;
    console.log('Equiped weapon index:', parseInt(lib1_gf_ECBDecrypt(crypted) || '0'));

    // Power Armors:
    crypted = bank.getKey('E', 'PA').value;
    console.log('Equiped armor index:', parseInt(lib1_gf_ECBDecrypt(crypted) || '0'));

    // Tools:
    crypted = bank.getKey('E', 'TO').value;
    console.log('Equiped tool index:', parseInt(lib1_gf_ECBDecrypt(crypted) || '0'));

    // Turrets:
    crypted = bank.getKey('E', 'T').value;
    const equippedTurrets: number[] = [];
    for (i = 0; i < 5; i++) {
      const word: string = sc2_StringWord(crypted, i);
      if (word != '')
        equippedTurrets.push(parseInt(lib1_gf_ECBDecrypt(word) || '0'));
      else
        equippedTurrets.push(0);
    }
    console.log('Equiped turrest indexes:', equippedTurrets);

    // Structures:
    crypted = bank.getKey('E', 'S').value;
    const equippedStructures: number[] = [];
    for (i = 0; i < 6; i++) {
      const word: string = sc2_StringWord(crypted, i);
      if (word != '')
        equippedStructures.push(parseInt(lib1_gf_ECBDecrypt(word) || '0'));
      else
        equippedStructures.push(0);
    }
    console.log('Equiped structures indexes:', equippedStructures);

    // Supply
    crypted = bank.getKey('SE', 'S').value;
    console.log('Equiped supply index:', parseInt(lib1_gf_ECBDecrypt(crypted) || '0'));

    return [
      { type: 'number', value: result[0], description: 'Vanadium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[1], description: 'Chromium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[2], description: 'Titanium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[3], description: 'Tungsten', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[4], description: 'Gold', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[5], description: 'Noobium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[6], description: 'Osmium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[7], description: 'Iridium', min: 0, max: 90000000, tip: '0 - 90000000' },
      { type: 'number', value: result[8], description: 'Palladium', min: 0, max: 90000000, tip: '0 - 90000000' }
    ];
  }

}

export default new Functions();