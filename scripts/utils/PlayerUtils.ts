import {
  EntityComponentTypes,
  EntityInventoryComponent,
  Player,
} from '@minecraft/server';

export class PlayerUtils {
  static hasItem(
    player: Player,
    itemId: string,
    itemAmount: number = 1
  ): boolean {
    const { container } = player.getComponent(
      EntityComponentTypes.Inventory
    ) as EntityInventoryComponent;
    if (container == undefined) return false;

    let amount = 0;
    for (let i = 0; i < container.size; i++) {
      const slot = container.getSlot(i);
      if (!slot.hasItem()) continue;
      if (slot.typeId === itemId) amount += slot.amount;
    }
    return itemAmount <= amount;
  }
}
