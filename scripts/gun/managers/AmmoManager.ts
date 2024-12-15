import {
  EntityComponentTypes,
  EntityEquippableComponent,
  EquipmentSlot,
  ItemStack,
  Player,
  world,
} from '@minecraft/server';
import { EmptyGunReplacer } from '../utils/EmptyGunReplacer';

export class AmmoManager {
  private gun: ItemStack;
  private owner: Player;
  private gunId: string;

  constructor(gun: ItemStack, owner: Player) {
    this.gun = gun;
    this.owner = owner;
    this.gunId = gun.getDynamicProperty('gunId') as string;
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

  removeAmmoCount(amount: number): void {
    const newCount = this.getAmmoCount() - amount;
    this.setAmmoCount(newCount);
    if (newCount === 0) {
      EmptyGunReplacer.replace(this.owner, this.gun);
    }
  }
}
