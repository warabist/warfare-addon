import {
  Player,
  EntityComponentTypes,
  EntityProjectileComponent,
} from '@minecraft/server';
import { Vector3Utils } from '@minecraft/math';

export class ProjectileShooter {
  static shoot(
    owner: Player,
    ammoProjectileId: string,
    uncertainty: number = 0
  ) {
    const viewDirection = owner.getViewDirection();
    const projectile = owner.dimension
      .spawnEntity(
        ammoProjectileId,
        Vector3Utils.add(owner.getHeadLocation(), viewDirection)
      )
      .getComponent(
        EntityComponentTypes.Projectile
      ) as EntityProjectileComponent;
    projectile.owner = owner;
    projectile.shoot(viewDirection, { uncertainty: uncertainty });
  }
}
