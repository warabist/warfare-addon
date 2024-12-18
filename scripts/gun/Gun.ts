import {
  ItemStartUseAfterEvent,
  ItemStopUseAfterEvent,
  world,
  Player,
} from '@minecraft/server';
import { GunData } from './interfaces/GunData';
import { AmmoManager } from './managers/AmmoManager';
import { ProjectileShooter } from './utils/ProjectileShooter';

export abstract class Gun {
  abstract data: GunData;

  register(): void {
    this.initEventSubscriber();
  }

  protected initEventSubscriber(): void {
    world.afterEvents.itemStartUse.subscribe((eventData) => {
      this.onItemStartUse(eventData);
    });
    world.afterEvents.itemStopUse.subscribe((eventData) => {
      this.onItemStopUse(eventData);
    });
  }

  protected onItemStartUse(eventData: ItemStartUseAfterEvent): void {}

  protected onItemStopUse(eventData: ItemStopUseAfterEvent): void {}

  protected shoot(ammoManager: AmmoManager, owner: Player): void {
    ProjectileShooter.shoot(owner, this.data.bulletProjectileId, {
      power: this.data.power,
      uncertainty: this.data.uncertainty,
    });
    ammoManager.removeAmmoCount(1, this.data.emptyGunItemId);
  }
}
