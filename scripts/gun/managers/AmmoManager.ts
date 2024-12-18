import { ItemStack, Player, world } from '@minecraft/server';
import { GunReplacer } from '../utils/GunReplacer';

export class AmmoManager {
  private gunItem: ItemStack;
  private owner: Player;
  private gunId: string;

  constructor(gunItem: ItemStack, owner: Player) {
    this.gunItem = gunItem;
    this.owner = owner;
    this.gunId = gunItem.getDynamicProperty('gunId') as string;
  }

  getAmmoCount(): number {
    return world.getDynamicProperty(this.gunId) as number;
  }

  setAmmoCount(amount: number): void {
    world.setDynamicProperty(this.gunId, amount);
  }

  addAmmoCount(amount: number): void {
    this.setAmmoCount(this.getAmmoCount() + amount);
  }

  removeAmmoCount(amount: number, emptyGunItemId: string): void {
    const newCount = this.getAmmoCount() - amount;
    this.setAmmoCount(newCount);
    if (newCount === 0) {
      GunReplacer.replaceEmptyGun(this.owner, this.gunItem, emptyGunItemId);
    }
  }
}
