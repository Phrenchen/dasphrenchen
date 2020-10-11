import { Sprite } from 'pixi.js';

export interface Unit {
    id: string,
    url: string,
    sprite: Sprite | null,
    laneCenterX: number,

    lifeTimeMs: number,
    speedY: number
}
