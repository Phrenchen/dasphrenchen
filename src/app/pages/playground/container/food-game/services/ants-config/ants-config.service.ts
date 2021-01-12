import { Injectable } from '@angular/core';
import { MathHelper } from 'src/app/helpers/MathHelper';
import { AntsConfig } from '../../interfaces/AntsConfig';

@Injectable({
  providedIn: 'root',
})
export class AntsConfigService {
  public readonly config: AntsConfig = {
    isGameRunning: false,
    maxTargetAquisitions: 2,
    initialFoodCount: 100,
    initialUnitCount: 10,
    initialAntHillCount: 1,
    foodConfig: {
      name: 'food',
      strokeStyle: '#8fa921', // primaryColorAlpha
      fillStyle: '#8fa921', // primaryColorAlpha
      radius: 2,
      position: { x: 0, y: 0 },
    },
    unitConfig: {
      name: 'unit',
      strokeStyle: '#476e0488', // secondaryColorAlpha
      fillStyle: '#476e04', // secondaryColorAlpha
      radius: 4,
      position: { x: 0, y: 0 },
      maxSpeed: 0.1,
      currentSpeed: 1,
      maxInventory: 1,
      currentInventory: 0,
      currentTarget: null,
    },
    antHillConfig: {
      name: 'anthill',
      strokeStyle: '#1b4400',
      fillStyle: '#1b4400',
      radius: 15,
      position: { x: 0, y: 0 },
      currentFoodCount: 0,
    },
  };

  constructor() {}
}
