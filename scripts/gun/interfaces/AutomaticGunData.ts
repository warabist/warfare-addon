import { GunData } from './GunData';

export interface AutomaticGunData extends GunData {
  rate: number;
  uncertainty: number;
}
