import { Gun } from './Gun';

export class GunSystem {
  private guns: Gun[];

  constructor(guns: Gun[]) {
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
