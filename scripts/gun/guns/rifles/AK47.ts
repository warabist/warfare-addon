import { AutomaticGun } from '../../AutomaticGun';

export class AK47 extends AutomaticGun {
  constructor() {
    super({
      itemId: 'warfare:ak47',
      ammoItemId: 'warfare:ak47_magagine',
      ammoProjectileId: 'warfare:ak47_ammo',
      capacity: 30,
      rate: 2,
      zoomRatio: 2,
      uncertainty: 1,
      reloadTime: 30,
    });
  }
}
