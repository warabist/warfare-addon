import {
  EntityApplyDamageByProjectileOptions,
  ProjectileHitEntityAfterEvent,
  world,
} from '@minecraft/server';
import { Gun } from './Gun';
import { COMMON_DATA } from './constants/COMMON_DATA';

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
    world.afterEvents.projectileHitEntity.subscribe((eventData) => {
      this.onProjectileHitEntity(eventData);
    });
  }

  private onProjectileHitEntity(
    eventData: ProjectileHitEntityAfterEvent
  ): void {
    const { projectile, source } = eventData;
    if (projectile.typeId !== COMMON_DATA.ammoProjectile) return;
    eventData.getEntityHit().entity?.applyDamage(
      projectile.getProperty(
        COMMON_DATA.ammoAdditionalDamageProperty
      ) as number,
      {
        damagingProjectile: projectile,
        damagingEntity: source,
      } as EntityApplyDamageByProjectileOptions
    );
  }

  private registerGuns(): void {
    this.guns.forEach((gun) => {
      gun.register();
    });
  }
}
