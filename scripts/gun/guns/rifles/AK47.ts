import { AutomaticGun } from '../../AutomaticGun';

export class AK47 extends AutomaticGun {
  constructor() {
    super({
      gunItemId: 'warfare:ak47',
      emptyGunItemId: 'warfare:ak47_empty',
      ammoItemId: 'warfare:ak47_magagine',
      bulletProjectileId: 'warfare:ak47_bullet',
      power: 10,
      uncertainty: 3,
      capacity: 30,
      rate: 2,
      zoomRatio: 2,
      reloadTime: 30,
    });
  }
}
