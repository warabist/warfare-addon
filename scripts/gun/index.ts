import { guns } from './guns';

export class GunSystem {
  private guns;

  constructor() {
    this.guns = guns;
  }

  start(): void {
    this.registerGuns();
  }

  private registerGuns(): void {
    this.guns.forEach((gun) => {
      gun.register();
    });
  }
}
