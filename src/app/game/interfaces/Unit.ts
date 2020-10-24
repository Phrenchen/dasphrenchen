import { Sprite } from 'pixi.js';

export interface Unit {
    id: string,
    url: string,
    sprite: Sprite | null,
    laneCenterX: number,
    
    isAlive: boolean;
    createTimeMs: number,
    lifeTimeMs: number,
    speedX: number,
    speedY: number
}
