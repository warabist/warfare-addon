import { ProjectileHitBlockAfterEvent, world } from '@minecraft/server';
import { Gun } from './Gun';

export class GunSystem {
  private guns: Gun[];

  constructor(guns: Gun[]) {
    this.guns = guns;
  }

  start(): void {
    this.initEventSubscriber();
    this.registerGuns();
  }

  private initEventSubscriber(): void {
    world.afterEvents.projectileHitBlock.subscribe((eventData) => {
      this.onProjectileHitBlock(eventData);
    });
  }

  //弾が当たった時に穴風のパーティクルを出す
  private onProjectileHitBlock(eventData: ProjectileHitBlockAfterEvent): void {}

  private registerGuns(): void {
    this.guns.forEach((gun) => {
      gun.register();
    });
  }
}
