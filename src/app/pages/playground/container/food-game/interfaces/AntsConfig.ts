import { Point } from '@angular/cdk/drag-drop';

export interface Renderable {
  strokeStyle: string;
  fillStyle: string;
  radius: number;
  position: Point;
}

export interface FoodConfig extends Renderable {}

export interface UnitConfig extends Renderable {
  maxSpeed: number;
  currentSpeed: number;
  maxInventory: number;
  currentInventory: number;
  currentTarget: Renderable | null,
}

export interface AntHillConfig extends Renderable {
  currentFoodCount: number;
}

export interface AntsConfig {
  isGameRunning: boolean;
  maxTargetAquisitions: number;
  initialFoodCount: number;
  initialUnitCount: number;
  initialAntHillCount: number;
  foodConfig: FoodConfig;
  unitConfig: UnitConfig;
  antHillConfig: AntHillConfig;
}
