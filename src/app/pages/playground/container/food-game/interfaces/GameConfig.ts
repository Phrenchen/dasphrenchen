import { UnitConfig } from "./AntsConfig";

export interface TeamConfig {
  origin: { x: number; y: number; };
  id: string;
  name: string;
  color: string; // #rrggbb
  units: UnitConfig[];

  wins: number;
  foodCount: number;
  unitCount: number;
  minSpeed: number;
  maxSpeed: number;
  minInventory: number;
  maxInventory: number;
}
