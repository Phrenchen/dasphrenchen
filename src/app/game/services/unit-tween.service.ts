import { Injectable } from '@angular/core';

import { TweenLite } from 'gsap'

import { Unit } from '../interfaces/Unit';
import { MathHelper } from '../helper/MathHelper';

@Injectable({
  providedIn: 'root'
})
export class UnitTweenService {

  constructor() { }

  public initialTween(unit: Unit): void {
    if (!unit || !unit.sprite) return;

    const angle: number = MathHelper.getRandomInt(-720, 720) + 180;

    TweenLite.to(unit.sprite, 5, { alpha: 1, width: 500, height: 500 });
    TweenLite.to(unit.sprite, 20, { angle: angle });
    TweenLite.to(unit.sprite, 5, { delay: 5, alpha: 0, width: 0, height: 0, ease: "power2.out" });
  }

  // public presentationTween(unit: Unit): void {
  //   TweenLite.to(unit.sprite, 1, { angle: 0 });
  //   TweenLite.to(unit.sprite, 1, { scale: 1 });

  // }

  public reset(unit: Unit) {
    if (!unit || !unit.sprite) return;

    // unit.sprite.x = unit.laneCenterX;
    // unit.sprite.y = 0;
    unit.sprite.scale.x = 0;
    unit.sprite.scale.y = 0;
    // unit.sprite.alpha = .5;
    unit.sprite.rotation = MathHelper.getRandomInt(0, 360);
  }
}
