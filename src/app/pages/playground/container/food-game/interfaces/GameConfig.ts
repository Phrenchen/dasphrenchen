import { AntHillConfig, UnitConfig } from "./AntsConfig";

export interface TeamConfig {
  antHill: AntHillConfig | null;
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
