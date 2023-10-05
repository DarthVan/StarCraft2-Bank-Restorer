/* Generated with TypeScript snippets */

import { r } from '@src/utils/utils';
import { makeAutoObservable } from 'mobx';
import { MParam } from '../MParam';

/** Store **
* ...
* @Author Star Noob
* @Created 2023-10-01
*/

class Store {

  public stats: MParam[];
  public heroes: MParam[];
  public talents: MParam[];
  public rewards: MParam[];
  public materials: MParam[];
  public items: MParam[];

  public params: MParam[]; // todo: remove later

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  //-------------------------------------------------- PUBLIC ---------------------------------------------------

  public setFields(params?: MParam[]): void {
    this.params = params ? [...params] : [];
  }

  public updateAt(index: number, value: number, mutation?: boolean): void {
    if (mutation) {
      this.params[index].value = value;
      return;
    }
    const p: MParam[] = [...this.params];
    p[index].value = value;
    this.params = p;
  }

  public reset(): void {
    this.init();
  }

  //------------------------------------------------- PROTECTED -------------------------------------------------

  private init(): void {

    //if(gv_accountLevel > 200000) cheater;






    /* this.params = [
      { type: 'number', value: prestige, description: 'Prestige', min: 0, max: 40, tip: '0 - 40' },
      { type: 'number', value: r(25, 175), description: 'Level', min: 1, max: 200, tip: '1 - 200' },
      { type: 'number', value: r(25, 125), description: 'Wins', min: 0, max: 200, tip: '1 - 200' },

      { type: 'number', value: 35, description: 'Nights', min: 0, max: 35, tip: '0 - 35' },
      { type: 'number', value: 35, description: 'Elite', min: 0, max: 35, tip: '0 - 35' },
      { type: 'number', value: 35, description: 'Nightmare', min: 0, max: 35, tip: '0 - 35' },
      { type: 'number', value: 35, description: 'Hell', min: 0, max: 35, tip: '0 - 35' },
      { type: 'number', value: r(0, 35), description: 'Impossible', min: 0, max: 35, tip: '0 - 35' },

      { type: 'number', value: wall, description: 'Wall', min: 0, max: 999999 }, // 8
      { type: 'number', value: cannons, description: 'Cannons', min: 0, max: 999999 },
      { type: 'number', value: healer, description: 'Healer', min: 0, max: 999999 },
      { type: 'number', value: generator, description: 'Generator', min: 0, max: 999999 },
      { type: 'number', value: economy, description: 'Economy', min: 0, max: 999999 }
    ]; */
  }

}

export default new Store();