import { Injectable } from '@angular/core';
import { Point } from '@angular/cdk/drag-drop';
import { Renderable, UnitConfig } from '../../interfaces/AntsConfig';

@Injectable({
  providedIn: 'root',
})
export class AntsRenderingService {
  public canvas: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;

  constructor() {}

  public drawRenderable(entity: Renderable): void {
    if (!this.ctx || !entity) return;

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

  public drawConnection(e1: Renderable, e2: Renderable): void {
    if (!this.ctx) return;

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#476e0488';
    // this.ctx.fillStyle = '#8fa921';
    this.ctx.beginPath();
    this.ctx.moveTo(e1.position.x, e1.position.y);
    this.ctx.lineTo(e2.position.x, e2.position.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  public clearCanvas(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
