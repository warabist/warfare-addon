import { guns } from './guns';

export class GunSystem {
  constructor() {}

  start(): void {
    this.registerGuns();
  }

  private registerGuns(): void {
    guns.forEach((gun) => {
      gun.register();
    });
  }
}
