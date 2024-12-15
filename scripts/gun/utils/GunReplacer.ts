import {
  ItemStack,
  EntityComponentTypes,
  EntityEquippableComponent,
  Player,
  EquipmentSlot,
} from '@minecraft/server';

export class GunReplacer {
  static replaceEmptyGun(owner: Player, gun: ItemStack): void {
    const equippable = owner.getComponent(
      EntityComponentTypes.Equippable
    ) as EntityEquippableComponent;
    const emptyAmmoGun = new ItemStack(gun.typeId + '_empty', 1); //例: warfare:ak47_empty
    //this.itemStackのデータをemptyAmmoGunに移植
    emptyAmmoGun.nameTag = gun.nameTag;
    for (const id of gun.getDynamicPropertyIds()) {
      emptyAmmoGun.setDynamicProperty(id, gun.getDynamicProperty(id));
    }
    emptyAmmoGun.setLore(gun.getLore());
    equippable.setEquipment(EquipmentSlot.Mainhand, emptyAmmoGun);
  }

  static replaceLoadedGun(owner: Player, emptyGun: ItemStack) {}
}
