import { AutomaticGun } from '../../AutomaticGun';

export class AK47 extends AutomaticGun {
  constructor() {
    super({
      gunItemId: 'warfare:ak47',
      ammoItemId: 'warfare:ak47_magagine',
      capacity: 30,
      rate: 2,
      zoomRatio: 2,
      uncertainty: 1,
      reloadTime: 30,
    });
  }
}
