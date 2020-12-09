import { Injectable } from '@angular/core';
import { MathHelper } from 'src/app/helpers/MathHelper';
import {
  AntHillConfig,
  AntsConfig,
  FoodConfig,
  Renderable,
  UnitConfig,
} from '../../interfaces/AntsConfig';
import { AntsConfigService } from '../ants-config/ants-config.service';
import { AntsRenderingService } from '../ants-rendering/ants-rendering.service';
import { AntFactoryService } from './ant-factory.service';

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
  private requestAnimationFrameId: number = 0;

  constructor(
    private readonly antsConfig: AntsConfigService,
    private readonly antFactory: AntFactoryService,
    private readonly antsRendering: AntsRenderingService
  ) {}

  public startGame(): void {
    this.initStage();

    if (!this.canvas || !this.ctx) {
      console.log('couldnt init stage');
      return;
    }

    this.antsRendering.canvas = this.canvas;
    this.antsRendering.ctx = this.ctx;

    const config: AntsConfig = this.antsConfig.config;

    // create ant hill (map center)
    this.createAntHill(config);
    this.anthill = config.antHillConfig;

    this.untargetedFood = this.createFood(config);
    this.units = this.createUnits(config);

    // create food
    // create units
    config.isGameRunning = true;
    this.startGameLoop(config);
  }

  public togglePlayPause(): void {
    this.antsConfig.config.isGameRunning = !this.antsConfig.config.isGameRunning;

    if(!this.antsConfig.config.isGameRunning) {
      this.stopGame();
    }
  }

  public stopGame(): void {
    // clearInterval(this.targetAssignmentInterval);
    this.antsConfig.config.isGameRunning = false;
    clearTimeout(this.targetAssignmentInterval);
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = 0;
  }

  // PRIVATE
  private startGameLoop(config: AntsConfig): void {
    const gameLoop = () => {
      // console.log('tick', config.isGameRunning);

      this.clearCanvas();

      this.assignTargets(config);

      // move units
      this.units.forEach((unit) => {
        if (unit.currentTarget) {
          const hasReachedTarget: boolean = this.moveUnitToTarget(unit);

          if (hasReachedTarget) {
            const collectedFood: FoodConfig = unit.currentTarget;
            const index = this.targetedFood.findIndex(
              (food) => food === collectedFood
            );
            this.targetedFood.splice(index, 1);

            unit.currentTarget = null;
          }
        }
      });

      // render units
      this.antsRendering.drawRenderable(this.anthill);
      this.untargetedFood.forEach((food) =>
        this.antsRendering.drawRenderable(food)
      );
      this.units.forEach((unit) => this.antsRendering.drawRenderable(unit));
      // ...

      // console.log('1111:!"', config.isGameRunning);
      // if(config.isGameRunning) {
        this.requestAnimationFrameId = window.requestAnimationFrame(gameLoop);
      // }
    };

    gameLoop(); // trigger loop
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
   *
   * @param unit
   * @returns hasReachedTarget
   */
  private moveUnitToTarget(unit: UnitConfig): boolean {
    if (!unit.currentTarget) return false;

    const easing: number = unit.currentSpeed;
    const collectableAtDistance: number = 0.2;

    const dx: number = unit.currentTarget.position.x - unit.position.x;
    const dy: number = unit.currentTarget.position.y - unit.position.y;

    const vx: number = dx * easing;
    const vy: number = dy * easing;

    unit.position.x += vx;
    unit.position.y += vy;

    return dx < collectableAtDistance && dy < collectableAtDistance; // TODO: set "collectable-distance"
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
