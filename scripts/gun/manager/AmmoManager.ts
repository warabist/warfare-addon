import {
  EntityComponentTypes,
  EntityEquippableComponent,
  EquipmentSlot,
  ItemStack,
  Player,
  world,
} from '@minecraft/server';

export class AmmoManager {
  private itemStack: ItemStack;
  private owner: Player;

  constructor(itemStack: ItemStack, owner: Player) {
    this.itemStack = itemStack;
    this.owner = owner;
  }

  getGunId(): string {
    return this.itemStack.getDynamicProperty('gunId') as string;
  }

  getAmmoCount(): number {
    return world.getDynamicProperty(
      this.itemStack.getDynamicProperty('gunId') as string
    ) as number;
  }

  addAmmoCount(amount: number): void {
    world.setDynamicProperty(this.getGunId(), this.getAmmoCount() + amount);
  }

  removeAmmoCount(amount: number): void {
    const newCount = this.getAmmoCount() - amount;
    world.setDynamicProperty(this.getGunId(), newCount);
    if (newCount === 0) this.replaceWithEmptyAmmoGun();
  }

  private replaceWithEmptyAmmoGun(): void {
    const equippable = this.owner.getComponent(
      EntityComponentTypes.Equippable
    ) as EntityEquippableComponent;
    const emptyAmmoGun = new ItemStack(
      this.itemStack.typeId + '_empty_ammo',
      1
    );
    //this.itemStackのデータをemptyAmmoGunに移植
    emptyAmmoGun.nameTag = this.itemStack.nameTag;
    for (const id of this.itemStack.getDynamicPropertyIds()) {
      emptyAmmoGun.setDynamicProperty(
        id,
        this.itemStack.getDynamicProperty(id)
      );
    }
    emptyAmmoGun.setLore(this.itemStack.getLore());
    equippable.setEquipment(EquipmentSlot.Mainhand, emptyAmmoGun);
  }
}
