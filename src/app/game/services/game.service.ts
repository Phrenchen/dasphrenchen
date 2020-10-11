import { Injectable } from '@angular/core';
import { Observable, interval, of, fromEvent } from 'rxjs';
import { throttleTime, filter } from 'rxjs/operators';
import { UnitService } from './unit.service';
import { PixiService } from './pixi.service';
import { Unit } from '../interfaces/Unit';

import { MathHelper } from './../helper/MathHelper';
import { UnitTweenService } from './unit-tween.service';


interface PointerStatus {
  gameIsRunning: boolean,
  isPointerDown: boolean,
  positionX: number,
  positionY: number,
  closestTarget: HTMLElement | null,
  targets: TargetDetails[],
  viewRange: number,
  
  unitCounter: number;
  units: Unit[],
  unitSpawnCooldownMs: number;
  unitSpawnInterval: number;
}

interface TargetDetails {
  target: HTMLElement,
  originalColor: string
}

let self: GameService;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private pointerState: PointerStatus = {
    gameIsRunning: false,
    isPointerDown: false,
    positionX: 0,
    positionY: 0,
    closestTarget: null,
    targets: [],
    viewRange: 200,

    unitSpawnInterval: -1,
    unitCounter: 1,
    units: [],
    unitSpawnCooldownMs: 2000,
  };


  constructor(private pixiService: PixiService, private unitService: UnitService, private unitTweenService: UnitTweenService) { }

  public init(): void {
    self = this;

    // find header buttons & position
    const targets: HTMLElement[] = Array.from(document.querySelectorAll('.header-btn')) as HTMLElement[];

    // sort by positionX
    targets.sort((a, b) => {
      const boxA = a.getBoundingClientRect();
      const posAX = boxA.left + window.pageXOffset + (boxA.width * .5);

      const boxB = b.getBoundingClientRect();
      const posBX = boxB.left + window.pageXOffset + (boxB.width * .5);

      if (posAX === posBX) return 0;
      return posAX < posBX ? 1 : -1;
    });

    targets.forEach(element => {
      this.pointerState.targets.push({
        target: element,
        originalColor: element.style.color
      });
    });

    // POINTER DOWN
    const pd$ = fromEvent(document, 'pointerdown');
    pd$.pipe(
      filter(() => this.pointerState.gameIsRunning)
    ).subscribe((event) => {
      this.pointerState.isPointerDown = true;

      const pe: PointerEvent = event as PointerEvent;
      this.updatePointerPosition(pe);
      this.updateClosestTarget();
    });

    // POINTER UP
    const pu$ = fromEvent(document, 'pointerup');
    pu$.pipe(
      filter(() => this.pointerState.gameIsRunning)
    ).subscribe((event) => {
      this.pointerState.isPointerDown = false;

      // this.stopUnitSpawn();
    });


    // POINTER MOVE
    const throttleMs = 100;
    const mm$ = fromEvent(document, 'pointermove');
    mm$.pipe(
      filter(() => this.pointerState.gameIsRunning),
      throttleTime(throttleMs)
    ).subscribe((event) => {
      const pe: PointerEvent = event as PointerEvent;
      this.updatePointerPosition(pe);
      // this.updateClosestTarget();
    });

    this.animationLoop();
  }


  private animationLoop() {
    requestAnimationFrame(self.animationLoop);

    // move units
    self.pointerState.units.forEach(unit => {
      if (unit.sprite) {
        unit.sprite.y += unit.speedY;
      }
    });

    self.pixiService.update();
  }


  // Unit spawn
  private spawnUnits() {
    if (this.pointerState.unitSpawnInterval >= 0) {
      return;
    }

    this.pointerState.unitSpawnInterval = setInterval(() => {
      let unitCounter = this.pointerState.unitCounter;
      const laneId: number = MathHelper.getRandomInt(0, 5);
      const positionY: number = MathHelper.getRandomInt(0, window.innerHeight * .5);  // random position top half of screen

      while(unitCounter-- > 0) {
        this.createUnit(laneId, positionY);
      }
    }, this.pointerState.unitSpawnCooldownMs);
  }

  createUnit(laneId: number, positionY: number) {
    const laneSpawner: HTMLElement = this.pointerState.targets[laneId].target;
    const box = laneSpawner.getBoundingClientRect();
    const laneCenterX = box.left + window.pageXOffset + (box.width * .5);

    const unit: Unit = this.unitService.createUnit(laneId, laneCenterX, positionY);
    
    if(unit.sprite) {
      unit.laneCenterX = laneCenterX;
      
      unit.sprite.alpha = 0;
      
      // this.unitTweenService.reset(unit);  // set initial state

      // tween from initial (invisible) state to "idle state" (dropping vertically)
      this.unitTweenService.initialTween(unit);
    }


    this.pointerState.units.push(unit);
  }

  private stopUnitSpawn() {
    if (this.pointerState.unitSpawnInterval) {
      clearInterval(this.pointerState.unitSpawnInterval);
      this.pointerState.unitSpawnInterval = -1;
    }
  }
  // Unit spawn end

  public start(): void {
    this.pointerState.gameIsRunning = true;
    this.spawnUnits();
  }

  public pause() {
    this.pointerState.gameIsRunning = false;
    this.stopUnitSpawn();
  }

  public reset(): void { }


  // private
  private updatePointerPosition(event: PointerEvent) {
    this.pointerState.positionX = event.clientX;
    this.pointerState.positionY = event.clientY;
  }

  private updateClosestTarget() {
    let closestDistance: number = Number.MAX_VALUE;




    this.pointerState.targets.forEach(element => {
      const box = element.target.getBoundingClientRect();
      const posX = box.left + window.pageXOffset + (box.width * .5);
      const posY = box.top + window.pageYOffset + (box.height * .5);

      const distance: number = this.distance(this.pointerState.positionX,
        this.pointerState.positionY,
        posX,
        posY);

      if (distance < closestDistance) {
        closestDistance = distance;

        this.pointerState.closestTarget = element.target;
      }
    });

    this.pointerState.targets.forEach(element => {
      element.target === this.pointerState.closestTarget ?
        element.target.style.setProperty('color', '#ff0000') :
        element.target.style.setProperty('color', element.originalColor);
    });

    this.pointerState.closestTarget?.style.setProperty('color', '#ff0000');
  }

  // helper
  private distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2, 2)))
  }
}
