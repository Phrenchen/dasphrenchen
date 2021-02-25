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
import { TeamConfig } from '../interfaces/GameConfig';
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})
export class AntGameService {
  public canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  // entities
  public teams: TeamConfig[] = [];
  // public units: UnitConfig[] = [];

  public untargetedFood: FoodConfig[] = []; // untargetedFood. all new food is included here.
  public targetedFood: FoodConfig[] = []; // food moves from untargetedFood

  // public anthill!: AntHillConfig;
  private targetAssignmentInterval!: any; // NodeJS.Timeout
  private requestAnimationFrameId: number | null = null;

  public currentGeneration: number = 0;

  constructor(
    private readonly antsConfigService: AntsConfigService,
    private readonly antFactoryService: AntFactoryService,
    private readonly antsRenderingService: AntsRenderingService
  ) {}

  // public get canvasWidth(): number {
  //   // random distribution
  //   food.position.x = MathHelper.getRandomInt(
  //     padding,
  //     this.canvas.width - padding
  //   );
  //   food.position.y = MathHelper.getRandomInt(
  //     padding,
  //     this.canvas.height - padding
  //   );
  // }

  public startGame(teamConfigs: TeamConfig[]): void {
    this.initStage();

    if (!this.canvas || !this.ctx) {
      console.error('couldnt init stage');
      return;
    }

    this.antsRenderingService.canvas = this.canvas;
    this.antsRenderingService.ctx = this.ctx;
    this.teams = [];
    // -----------------------

    // create ant hill (map center)
    const antsConfig: AntsConfig = this.antsConfigService.config;
    // this.createAntHill(antsConfig);
    // this.anthill = antsConfig.antHillConfig;

    this.untargetedFood = this.createFood(antsConfig); // create food

    teamConfigs.forEach((team) => {
      team.units = this.createUnits(antsConfig, team);
      this.teams.push(team);
    });

    antsConfig.isGameRunning = true;
    this.startGameLoop();
  }

  public stopGame(): void {
    this.antsConfigService.config.isGameRunning = false;
    clearTimeout(this.targetAssignmentInterval);
    this.antsRenderingService.clearCanvas();

    // reset state
    this.untargetedFood = [];
    this.targetedFood = [];

    // reset teams
    this.teams.forEach((team) => {
      team.foodCount = 0;
      if (team.antHill) {
        team.antHill.currentFoodCount = 0;
      }
    });

    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
    }
  }

  // PRIVATE
  private startGameLoop(): void {
    const gameLoop = () => {
      // console.log('tick', config.isGameRunning);
      // if(!config.isGameRunning) return;
      this.requestAnimationFrameId = null;

      this.clearCanvas();

      if (this.untargetedFood.length > 0) {
        this.assignTargets();
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
      this.teams.forEach((team) => {
        team.units.forEach((unit) => {
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

                  // console.log('unit.currentInventory', unit.currentInventory);

                  if (unit.currentInventory >= unit.maxInventory) {
                    unit.currentTarget = team.antHill;
                  }
                  break;
                case 'anthill':
                  if (team.antHill) {
                    team.antHill.currentFoodCount += unit.currentInventory;
                  }
                  team.foodCount += unit.currentInventory;

                  unit.currentInventory = 0;
                  // console.log('reached anthill. reset currentInventory.');
                  break;
              }

              // if (this.untargetedFood.length === 0) {
              //   console.log('no more food');
              //   this.stopGame();
              // }
            }
          }
        });
      });

      // render units
      // this.antsRenderingService.drawRenderable(this.anthill);
      this.untargetedFood.forEach((food) =>
        this.antsRenderingService.drawRenderable(food)
      );

      this.targetedFood.forEach((food) =>
        this.antsRenderingService.drawRenderable(food)
      );

      this.teams.forEach((team) => {

        team.units.forEach((unit) => {
          this.antsRenderingService.drawRenderable(unit);
          if (unit.currentTarget) {
            this.antsRenderingService.drawConnection(unit, unit.currentTarget);
          }
        });

        if (team.antHill) {
          // console.log('team.antHill', team.antHill);
          this.antsRenderingService.drawRenderable(team.antHill);
        }
      });

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
      this.assignTargets();
    }, 100);
  }

  private assignTargets() {
    this.teams.forEach((team) => {
      // select random next target for targetless units
      const targetLessUnits: UnitConfig[] = team.units.filter(
        (unit) => !unit.currentTarget
      );

      //
      targetLessUnits.forEach((unit) => {
        const nextFoodTarget: FoodConfig = this.untargetedFood.pop() as FoodConfig;

        unit.currentTarget = nextFoodTarget;
        this.targetedFood.push(nextFoodTarget);
      });
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

  private createAntHill(config: AntsConfig, teamConfig: TeamConfig) {
    if (!this.canvas || !this.ctx) return;

    teamConfig.antHill = JSON.parse(JSON.stringify(config.antHillConfig));

    if (teamConfig.antHill) {
      teamConfig.antHill.position = {
        x: teamConfig.origin.x,
        y: teamConfig.origin.y,
      };
      teamConfig.antHill.fillStyle = teamConfig.color;
      teamConfig.antHill.strokeStyle = teamConfig.color;

      this.antsRenderingService.drawRenderable(teamConfig.antHill);
    }
  }

  private createFood(config: AntsConfig): FoodConfig[] {
    return this.createEntities(
      config.foodConfig,
      config.initialFoodCount
    ) as FoodConfig[];
  }

  private createUnits(config: AntsConfig, teamConfig: TeamConfig) {
    config.unitConfig.fillStyle = teamConfig.color;
    config.unitConfig.strokeStyle = teamConfig.color;

    const antsConfig: AntsConfig = this.antsConfigService.config;
    this.createAntHill(antsConfig, teamConfig);

    // teamConfig.antHill = antsConfig.antHillConfig;

    return this.createEntities(
      config.unitConfig,
      teamConfig.unitCount,
      teamConfig.origin
    ) as UnitConfig[];
  }

  private createEntities(
    config: Renderable,
    amount: number,
    origin: { x: number; y: number } | null = null
  ): FoodConfig[] {
    if (!this.canvas || !this.ctx) return [];

    const entities: FoodConfig[] = [];
    const padding: number = 20;

    for (let i = 0; i < amount; i++) {
      const food: FoodConfig = JSON.parse(JSON.stringify(config));
      if (food.name === 'unit') {
        const unit: UnitConfig = food as UnitConfig;
        unit.maxSpeed = MathHelper.getRandomInt(0.1, unit.maxInventory);
        unit.maxInventory = MathHelper.getRandomInt(1, unit.maxInventory);
      }
      if (origin) {
        food.position.x = origin.x;
        food.position.y = origin.y;
      } else {
        // random distribution
        food.position.x = MathHelper.getRandomInt(
          padding,
          this.canvas.width - padding
        );
        food.position.y = MathHelper.getRandomInt(
          padding,
          this.canvas.height - padding
        );
      }
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
