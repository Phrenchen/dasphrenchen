import { EventEmitter, Injectable } from '@angular/core';
import { MathHelper } from 'src/app/helpers/MathHelper';
import {
  AntHillConfig,
  AntsConfig,
  FoodConfig,
  Renderable,
  UnitConfig,
} from '..//interfaces/AntsConfig';
import { AntsConfigService } from './ants-config/ants-config.service';
import { AntsRenderingService } from './ants-rendering/ants-rendering.service';
import { AntFactoryService } from './ant-factory/ant-factory.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AntGameService {
  public canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  // entities
  public units: UnitConfig[] = [];

  public untargetedFood: FoodConfig[] = []; // untargetedFood. all new food is included here.
  public targetedFood: FoodConfig[] = []; // food moves from untargetedFood

  public anthill!: AntHillConfig;
  private targetAssignmentInterval!: any; // NodeJS.Timeout
  private requestAnimationFrameId: number | null = null;

  public currentGeneration: number = 0;


  constructor(
    private readonly antsConfig: AntsConfigService,
    private readonly antFactory: AntFactoryService,
    private readonly antsRendering: AntsRenderingService
  ) {}

  public startGame(): void {
    this.initStage();

    if (!this.canvas || !this.ctx) {
      console.error('couldnt init stage');
      return;
    }

    this.antsRendering.canvas = this.canvas;
    this.antsRendering.ctx = this.ctx;
    // -----------------------

    const config: AntsConfig = this.antsConfig.config;

    // create ant hill (map center)
    this.createAntHill(config);
    this.anthill = config.antHillConfig;
    this.untargetedFood = this.createFood(config); // create food
    this.units = this.createUnits(config); // create units

    config.isGameRunning = true;
    this.startGameLoop(config);
  }

  public stopGame(): void {
    this.antsConfig.config.isGameRunning = false;
    clearTimeout(this.targetAssignmentInterval);

    // reset state
    this.untargetedFood = [];
    this.targetedFood = [];
    this.units = [];
    if(this.anthill) {
      this.anthill.currentFoodCount = 0;
    }

    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
    }
  }

  // PRIVATE
  private startGameLoop(config: AntsConfig): void {
    const gameLoop = () => {
      // console.log('tick', config.isGameRunning);
      // if(!config.isGameRunning) return;
      this.requestAnimationFrameId = null;

      this.clearCanvas();

      if (this.untargetedFood.length > 0) {
        this.assignTargets(config);
      } else {
        // console.log('no food remaining');
        // this.currentGeneration++;
        // this.stopGame();
        // setTimeout(() => {
        //   this.startGame();
        // }, 1000);
        // return;
      }

      // move units
      this.units.forEach((unit) => {
        if (unit.currentTarget) {
          const hasReachedTarget: boolean = this.moveUnitToTarget(unit);

          if (hasReachedTarget) {
            // COLLECT FOOD
            const collectedFood: FoodConfig = unit.currentTarget;
            // collectedFood.radius *= .25;
            // collectedFood.strokeStyle = '#000000';
            unit.currentTarget = null;

            switch (collectedFood.name) {
              case 'food':
                const index = this.targetedFood.findIndex(
                  (food) => food === collectedFood
                );

                this.targetedFood.splice(index, 1); // delete food
                unit.currentInventory++;

                if (unit.currentInventory >= unit.maxInventory) {
                  unit.currentTarget = this.anthill;
                }
                break;
              case 'anthill':
                this.anthill.currentFoodCount += unit.currentInventory;

                unit.currentInventory = 0;
                break;
            }


            // if (this.untargetedFood.length === 0) {
            //   console.log('no more food');
            //   this.stopGame();
            // }
          }
        }
      });

      // render units
      this.antsRendering.drawRenderable(this.anthill);
      this.untargetedFood.forEach((food) =>
        this.antsRendering.drawRenderable(food)
      );

      this.targetedFood.forEach((food) =>
        this.antsRendering.drawRenderable(food)
      );

      this.units.forEach((unit) => this.antsRendering.drawRenderable(unit));
      // ...

      // console.log('1111:!"', config.isGameRunning);
      // if(config.isGameRunning) {
      if (!this.requestAnimationFrameId) {
        // console.log('tick',  this.tickEmitter$$);
        this.requestAnimationFrameId = window.requestAnimationFrame(gameLoop);
      }
      // }
    };
    // GAME LOOP END

    if (!this.requestAnimationFrameId) {
      gameLoop(); // trigger loop
    } else {
      console.log('game already running');
    }
    // trigger target-assignment-interval

    this.targetAssignmentInterval = setTimeout(() => {
      this.assignTargets(config);
    }, 100);
  }

  private assignTargets(config: AntsConfig) {
    // select random next target for targetless units
    const targetLessUnits: UnitConfig[] = this.units.filter(
      (unit) => !unit.currentTarget
    );

    //
    targetLessUnits.forEach((unit, index) => {
      if (index < config.maxTargetAquisitions) {
        const nextFoodTarget: FoodConfig = this.untargetedFood.pop() as FoodConfig;

        unit.currentTarget = nextFoodTarget;
        this.targetedFood.push(nextFoodTarget);
      }
    });
  }

  /**
   * MOVE THEM!
   * @param unit
   * @returns hasReachedTarget
   */
  private moveUnitToTarget(unit: UnitConfig): boolean {
    if (!unit.currentTarget) return false;

    const easing: number = 0.01;
    const collectableAtDistance: number = 1;

    let dx: number = unit.currentTarget.position.x - unit.position.x;
    let dy: number = unit.currentTarget.position.y - unit.position.y;

    let vx: number = dx * easing;
    let vy: number = dy * easing;

    vx = MathHelper.clamp(vx, unit.maxSpeed * -1, unit.maxSpeed);
    vy = MathHelper.clamp(vy, unit.maxSpeed * -1, unit.maxSpeed);

    unit.position.x += vx;
    unit.position.y += vy;

    return (
      Math.abs(dx) < collectableAtDistance &&
      Math.abs(dy) < collectableAtDistance
    ); // TODO: set "collectable-distance"
  }

  private createAntHill(config: AntsConfig) {
    if (!this.canvas || !this.ctx) return;

    config.antHillConfig.position = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
    this.antsRendering.drawRenderable(config.antHillConfig);
  }

  private createFood(config: AntsConfig): FoodConfig[] {
    return this.createEntities(
      config.foodConfig,
      config.initialFoodCount
    ) as FoodConfig[];
  }

  private createUnits(config: AntsConfig) {
    return this.createEntities(
      config.unitConfig,
      config.initialUnitCount
    ) as UnitConfig[];
  }

  private createEntities(config: Renderable, amount: number): FoodConfig[] {
    if (!this.canvas || !this.ctx) return [];

    const entities: FoodConfig[] = [];
    const padding: number = 20;

    for (let i = 0; i < amount; i++) {
      const food: FoodConfig = JSON.parse(JSON.stringify(config));
      if(food.name === 'unit') {
        (food as UnitConfig).maxSpeed = MathHelper.getRandomInt(.3, 1.5);
        (food as UnitConfig).maxInventory = MathHelper.getRandomInt(1, 18);
      }
      food.position.x = MathHelper.getRandomInt(
        padding,
        this.canvas.width - padding
      );
      food.position.y = MathHelper.getRandomInt(
        padding,
        this.canvas.height - padding
      );
      entities.push(food);
    }

    return entities;
  }

  // ----
  private clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private initStage(): boolean {
    if (!this.canvas) {
      return false;
    }

    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      return false;
    }

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = 'low'; // low|medium|hight

    return true;
  }
}
