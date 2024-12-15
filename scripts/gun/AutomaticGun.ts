import {
  ItemStartUseAfterEvent,
  ItemStopUseAfterEvent,
  system,
  Player,
} from '@minecraft/server';
import { Gun } from './Gun';
import { AmmoManager } from './managers/AmmoManager';
import { AutomaticGunData } from './interfaces/AutomaticGunData';

export abstract class AutomaticGun extends Gun {
  data: AutomaticGunData;
  private shootingIntervalIdMap: Map<string, number>;

  constructor(data: AutomaticGunData) {
    super();
    this.data = data;
    this.shootingIntervalIdMap = new Map();
  }

  protected override onItemStartUse(eventData: ItemStartUseAfterEvent): void {
    const { itemStack, source } = eventData;
    if (itemStack.typeId === this.data.gunItemId) {
      const ammoManager = new AmmoManager(itemStack, source);
      this.startShooting(ammoManager, source);
    }
  }

  protected override onItemStopUse(eventData: ItemStopUseAfterEvent): void {
    const { itemStack, source } = eventData;
    if (itemStack?.typeId === this.data.gunItemId) {
      this.clearShootingInterval(source);
    }
  }

  protected startShooting(ammoManager: AmmoManager, owner: Player): void {
    this.shoot(ammoManager, owner); //shootingが始まった瞬間にshootする これが無いと一番初めのshootはrate後になる
    const shootingIntervalId = system.runInterval(() => {
      if (!owner.isValid() || ammoManager.getAmmoCount() === 0) {
        this.clearShootingInterval(owner);
        return;
      }
      this.shoot(ammoManager, owner);
    }, this.data.rate);
    this.shootingIntervalIdMap.set(owner.id, shootingIntervalId);
  }

  protected clearShootingInterval(owner: Player): void {
    system.clearRun(this.shootingIntervalIdMap.get(owner.id) ?? 0);
  }
}
