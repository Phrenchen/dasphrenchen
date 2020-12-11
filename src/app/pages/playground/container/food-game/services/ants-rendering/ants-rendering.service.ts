import { Injectable } from '@angular/core';
import { Point } from '@angular/cdk/drag-drop';
import { Renderable, UnitConfig } from '../../interfaces/AntsConfig';

@Injectable({
  providedIn: 'root'
})
export class AntsRenderingService {

  public canvas: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;

  constructor() { }


  public drawRenderable(entity: Renderable): void {
    if(!this.ctx) return;

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = entity.strokeStyle;
    this.ctx.fillStyle = entity.fillStyle;
    this.drawPoint(entity.position, entity.radius);
  }


  public drawPoint(point: Point, radius: number) {
    if (!this.canvas || !this.ctx) return;

    var centerX = point.x;
    var centerY = point.y;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }
}
