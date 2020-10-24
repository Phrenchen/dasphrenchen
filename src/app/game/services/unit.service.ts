import { Injectable } from '@angular/core';
import { Loader, Sprite } from 'pixi.js';
import { Unit } from './../interfaces/Unit';
import { PixiService } from './pixi.service';
import { MathHelper } from '../helper/MathHelper';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  public units: Unit[] = [
    {
      id: 'zelda_1',
      url: './assets/images/curious_zelda_1_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 1.2,
      speedY: 1.8,
      isAlive: true,
    },
    {
      id: 'zelda_2',
      url: './assets/images/curious_zelda_2_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 1.1,
      speedY: 1.6,
      isAlive: true,
    },
    {
      id: 'zelda_3',
      url: './assets/images/curious_zelda_3_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 1.1,
      speedY: 1.4,
      isAlive: true,
    },
    {
      id: 'zelda_4',
      url: './assets/images/curious_zelda_4_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 1.1,
      speedY: 1.5,
      isAlive: true,
    },
    {
      id: 'zelda_5',
      url: './assets/images/curious_zelda_5_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 1.3,
      speedY: 1.3,
      isAlive: true,
    },
    {
      id: 'zelda_6',
      url: './assets/images/curious_zelda_6_portrait.png',
      sprite: null,
      laneCenterX: 0,
      createTimeMs: 0,
      lifeTimeMs: Number.MAX_VALUE,
      speedX: 2,
      speedY: 2,
      isAlive: true,
    },
  ]

  constructor(private pixiService: PixiService) {
    this.loadImages();
  }

  private loadImages(): void {
    Loader.shared
      .add(this.units[0].id, this.units[0].url)
      .add(this.units[1].id, this.units[1].url)
      .add(this.units[2].id, this.units[2].url)
      .add(this.units[3].id, this.units[3].url)
      .add(this.units[4].id, this.units[4].url)
      .add(this.units[5].id, this.units[5].url)
      .load(() => {
        // console.log('loaded images');
      });
  }

  public createUnit(laneId: number, positionX: number, positionY: number): Unit {
    const unit: Unit = {...this.getUnitByLane(laneId)};     // clone unit preset
    const texture = Loader.shared.resources[unit.id].texture;
    const sprite = new Sprite(texture);

    unit.createTimeMs = new Date().getTime();
    unit.speedX *= MathHelper.coinFlip ? 1 : -1;
    unit.speedY *= MathHelper.coinFlip ? 1 : -1;

    this.pixiService.createUnit(unit);

    if(unit.sprite) {
      unit.sprite.width = 50;
      unit.sprite.height = 50;

      // position unit centered on lane
      // unit.sprite.x = positionX - unit.sprite.width * .5;
      unit.sprite.anchor.x = .5;
      unit.sprite.anchor.y = .5;
      
      // unit.sprite.scale.x = .5;
      // unit.sprite.scale.y = .5;

      unit.sprite.x = positionX;
      unit.sprite.y = positionY;
    }
    return unit;
  }


  // PRIVATE
  private getUnitByLane(laneId: number): Unit {
    if(laneId < 0 || laneId >= this.units.length) {
      // console.error('no lane with id. no unit created.', laneId);
      return this.units[0];
    }
    return this.units[laneId];
  }
}
