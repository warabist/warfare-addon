import {
  ItemStartUseAfterEvent,
  ItemStopUseAfterEvent,
  world,
} from '@minecraft/server';
import { GunData } from './interfaces/GunData';

export abstract class Gun {
  abstract data: GunData;

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
