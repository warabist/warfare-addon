import {
  ItemStartUseAfterEvent,
  ItemStopUseAfterEvent,
  system,
  Player,
} from '@minecraft/server';
import { Gun } from './Gun';
import { AmmoManager } from './manager/AmmoManager';
import { ProjectileShooter } from './utilities/ProjectileShooter';
import { AutomaticGunData } from './interfaces/AutomaticGunData';

export abstract class AutomaticGun extends Gun {
  private data: AutomaticGunData;
  private shootingIntervalIdMap: Map<string, number>;

  constructor(data: AutomaticGunData) {
    super();
    this.data = data;
    this.shootingIntervalIdMap = new Map();
  }

  protected override onItemStartUse(eventData: ItemStartUseAfterEvent): void {
    const { itemStack, source } = eventData;
    if (itemStack.typeId === this.data.itemId) {
      const ammoManager = new AmmoManager(itemStack, source);
      this.startShooting(ammoManager, source);
    }
  }

  protected override onItemStopUse(eventData: ItemStopUseAfterEvent): void {
    const { itemStack, source } = eventData;
    if (itemStack?.typeId === this.data.itemId) {
      this.clearShootingInterval(source);
    }
  }

  protected startShooting(ammoManager: AmmoManager, owner: Player): void {
    this.shoot(ammoManager, owner);
    const shootingIntervalId = system.runInterval(() => {
      this.shoot(ammoManager, owner);
    }, this.data.rate);
    this.shootingIntervalIdMap.set(owner.id, shootingIntervalId);
  }

  protected shoot(ammoManager: AmmoManager, owner: Player): void {
    if (!owner.isValid() || ammoManager.getAmmoCount() === 0) {
      this.clearShootingInterval(owner);
      return;
    }
    ProjectileShooter.shoot(
      owner,
      this.data.ammoProjectileId,
      this.data.uncertainty
    );
    ammoManager.removeAmmoCount(1);
  }

  protected clearShootingInterval(owner: Player): void {
    system.clearRun(this.shootingIntervalIdMap.get(owner.id) ?? 0);
  }
}
