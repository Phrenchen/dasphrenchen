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

    TweenLite.to(unit.sprite, 5, { alpha: 1, width: 500, height: 500, onComplete: () => {
      this.deathTween(unit);
    } });
    TweenLite.to(unit.sprite, 5, { angle: angle });
  }

  public deathTween(unit: Unit): void {
    if (!unit || !unit.sprite) return;
    
    (TweenLite as any).killTweensOf(unit.sprite);

    setTimeout(() => {
      if(unit.sprite) {
        const angle: number = -1 * (unit.sprite.rotation + 720);
        TweenLite.to(unit.sprite, 1, { alpha: 0, width: 0, height: 0, ease: "power2.in", angle: angle/*, onComplete: () => { console.log('unit death tween complete', unit.sprite); }*/ } );
      }
      
    },0);

  }


  public reset(unit: Unit) {
    if (!unit || !unit.sprite) return;

    unit.sprite.scale.x = 0;
    unit.sprite.scale.y = 0;
    unit.sprite.rotation = MathHelper.getRandomInt(0, 360);
  }
}
