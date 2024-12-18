import {
  Player,
  EntityComponentTypes,
  EntityProjectileComponent,
} from '@minecraft/server';
import { Vector3Utils } from '@minecraft/math';

export class ProjectileShooter {
  static shoot(
    owner: Player,
    projectileId: string,
    options?: {
      power?: number;
      uncertainty?: number;
    }
  ) {
    const viewDirection = owner.getViewDirection();
    const projectileEntity = owner.dimension.spawnEntity(
      projectileId,
      Vector3Utils.add(owner.getHeadLocation(), viewDirection)
    );
    const projectile = projectileEntity.getComponent(
      EntityComponentTypes.Projectile
    ) as EntityProjectileComponent;
    projectile.owner = owner;
    projectile.shoot(Vector3Utils.scale(viewDirection, options?.power ?? 1), {
      uncertainty: options?.uncertainty ?? 0,
    });
  }
}
