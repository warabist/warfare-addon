import {
  ItemStack,
  EntityComponentTypes,
  EntityEquippableComponent,
  Player,
  EquipmentSlot,
} from '@minecraft/server';

export class GunReplacer {
  static replaceEmptyGun(
    owner: Player,
    gunItem: ItemStack,
    emptyGunItemId: string
  ): void {
    const equippable = owner.getComponent(
      EntityComponentTypes.Equippable
    ) as EntityEquippableComponent;
    const emptyGunItem = new ItemStack(emptyGunItemId, 1);
    //this.itemStackのデータをemptyAmmoGunに移植
    emptyGunItem.nameTag = gunItem.nameTag;
    for (const id of gunItem.getDynamicPropertyIds()) {
      emptyGunItem.setDynamicProperty(id, gunItem.getDynamicProperty(id));
    }
    emptyGunItem.setLore(gunItem.getLore());
    equippable.setEquipment(EquipmentSlot.Mainhand, emptyGunItem);
  }

  static replaceLoadedGun(owner: Player, emptyGunItem: ItemStack) {}
}
