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
    initialFoodCount: 500,
    initialUnitCount: 10,
    initialAntHillCount: 1,
    foodConfig: {
      name: 'food',
      strokeStyle: '#00ff00',
      fillStyle: '#00ff00',
      radius: 2,
      position: {x: 0, y: 0},
    },
    unitConfig: {
      name: 'unit',
      strokeStyle: '#ff0000',
      fillStyle: '#ff0000',
      radius: 4,
      position: {x: 0, y: 0},
      minSpeed: .2,
      maxSpeed: MathHelper.getRandomInt(.3, 1.5),
      currentSpeed: 1,
      maxInventory: MathHelper.getRandomInt(1, 18),
      currentInventory: 0,
      currentTarget: null,
    },
    antHillConfig: {
      name: 'anthill',
      strokeStyle: '#ffff00',
      fillStyle: '#ffff00',
      radius: 15,
      position: {x: 0, y: 0},
      currentFoodCount: 0,
    },
  };

  constructor() {}
}
