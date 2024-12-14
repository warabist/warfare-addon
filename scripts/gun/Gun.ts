import {
  ItemStartUseAfterEvent,
  ItemStopUseAfterEvent,
  world,
} from '@minecraft/server';

export abstract class Gun {
  register(): void {
    this.initEventSubscriber();
  }

  protected initEventSubscriber(): void {
    world.afterEvents.itemStartUse.subscribe((eventData) => {
      this.onItemStartUse(eventData);
    });
    world.afterEvents.itemStopUse.subscribe((eventData) => {
      this.onItemStopUse(eventData);
    });
  }

  protected onItemStartUse(eventData: ItemStartUseAfterEvent): void {}

  protected onItemStopUse(eventData: ItemStopUseAfterEvent): void {}
}
