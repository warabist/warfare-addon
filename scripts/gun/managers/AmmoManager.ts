import {
  EntityComponentTypes,
  EntityEquippableComponent,
  EquipmentSlot,
  ItemStack,
  Player,
  world,
} from '@minecraft/server';
import { COMMON_DATA } from '../constants/COMMON_DATA';

export class AmmoManager {
  private gun: ItemStack;
  private owner: Player;
  private gunId: string;

  constructor(gun: ItemStack, owner: Player) {
    this.gun = gun;
    this.owner = owner;
    this.gunId = gun.getDynamicProperty(COMMON_DATA.gunIdProperty) as string;
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
    if (newCount === 0) this.replaceWithEmptyAmmoGun();
  }

  private replaceWithEmptyAmmoGun(): void {
    const equippable = this.owner.getComponent(
      EntityComponentTypes.Equippable
    ) as EntityEquippableComponent;
    const emptyAmmoGun = new ItemStack(this.gun.typeId + '_empty_ammo', 1);
    //this.itemStackのデータをemptyAmmoGunに移植
    emptyAmmoGun.nameTag = this.gun.nameTag;
    for (const id of this.gun.getDynamicPropertyIds()) {
      emptyAmmoGun.setDynamicProperty(id, this.gun.getDynamicProperty(id));
    }
    emptyAmmoGun.setLore(this.gun.getLore());
    equippable.setEquipment(EquipmentSlot.Mainhand, emptyAmmoGun);
  }
}
