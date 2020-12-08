import { Point } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ManuallyActivated } from '../../interfaces/ManuallyActivated';
import { MathHelper } from './../../../../helpers/MathHelper';

@Component({
  selector: 'dph-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.less']
})
export class AnimationsComponent implements OnInit, AfterViewInit, OnDestroy, ManuallyActivated {
  public trackedPoints: Point[] = [];


  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private inputSub: Subscription | null = null;

  private lastCurvePointIndex: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.activate();
   }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.inputSub)
      this.inputSub.unsubscribe();
  }
  // life cycle end


  activate(): void {
    this.canvas = document.querySelector('#bezier-canvas');

    if (!this.canvas) return;



    // Set display size (css pixels).
    var size = 600;
    this.canvas.style.width = size + "px";
    this.canvas.style.height = size + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    this.canvas.width = Math.floor(size * scale);
    this.canvas.height = Math.floor(size * scale);

    this.ctx = this.canvas.getContext('2d');

    if (this.ctx) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#ff0000';
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.imageSmoothingQuality = "high" // low|medium|hight
    }


    if (!this.canvas || !this.ctx) {
      return;
    }
    this.clearCanvas();

    console.log('activating animations');
    // this.mouseTrackerSub = fromEvent(this.canvas, 'mousemove')
    // this.inputSub = fromEvent(document.body, 'click')
    this.inputSub = fromEvent(this.canvas, 'click')
      .pipe(
        // throttleTime(500),
        map(mouseEvent => {
          const me: MouseEvent = mouseEvent as MouseEvent;
          const target: HTMLElement = me.target as HTMLElement;
          const box: DOMRect = target.getBoundingClientRect();

          return {
            x: me.clientX - box.x,
            y: me.clientY - box.y
          }
        }),
        tap(result => {
          this.drawPoint(result, this.trackedPoints.length % 3);
        }),
        // shareReplay()
      )
      .subscribe(result => {
        this.trackedPoints.push(result);
      });;

  }
  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawPoint(point: Point, mod: number) {
    if (!this.ctx) return;

    let strokeStyle: string;
    console.log('mod', mod);
    switch (mod) {
      case 0:
        strokeStyle = '#00ff00';
        break;
      case 1:
        strokeStyle = '#aaaaaa';
        break;
      case 2:
        strokeStyle = '#ff0000';
        break;
      default: strokeStyle = '#000000';
    }

    const size: number = 5;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(point.x - size, point.y - size);
    this.ctx.lineTo(point.x + size, point.y - size);
    this.ctx.lineTo(point.x + size, point.y + size);
    this.ctx.lineTo(point.x - size, point.y + size);
    this.ctx.lineTo(point.x - size, point.y - size);
    this.ctx.stroke();
    this.ctx.closePath();
  }


  deactivate(): void {
    if (this.inputSub)
      this.inputSub.unsubscribe();
  }


  public draw(): void {
    console.log('drawing', this.trackedPoints.length);
    if (this.trackedPoints.length < 3) {
      return;
    }

    this.clearCanvas();

    // clone points (adding first point to close the line)
    const points: Point[] = [...this.trackedPoints];
    points.forEach((point, index) => this.drawPoint(point, index % 3));

    // add first point to close the line
    // points.push(points[points.length - 1]);

    // need 3 points for a curve, duplicate points to fill up
    if ((points.length) % 3 === 1) {
      console.log('1 missing', points);

      points.push(points[0]);
    }
    else if ((points.length) % 3 === 2) {
      console.log('2 missing', points);

      points.push(points[1]);
      points.push(points[0]);
    }

    // this.lastCurvePointIndex = 0;

    this.animateCurve(points);
  }

  public clearPoints(): void {
    this.trackedPoints = [];
    this.clearCanvas();
  }

  private animateCurve(curvePoints: Point[], startIndex: number = 0, progress: number = -1) {
    if (!this.ctx || startIndex > curvePoints.length - 3) {
      console.error('start index invalid: ', curvePoints.length, startIndex, progress);
      return;
    }

    this.animatePathDrawing(
      this.ctx,
      curvePoints[startIndex].x,
      curvePoints[startIndex].y,

      curvePoints[startIndex + 1].x,
      curvePoints[startIndex + 1].y,

      curvePoints[startIndex + 2].x,
      curvePoints[startIndex + 2].y,

      1000,
      progress
    );

    this.lastCurvePointIndex = startIndex + 2;
  }


  // PRIVATE
  /**
     * draws curve with N points
     * @param v0
     * @param v1
     * @param t
     */
  // private calculatePoints(points: Point[]): Point[] {
  //   if (!this.ctx) return [];

  //   // this.ctx.moveTo(points[0].x, points[0].y);

  //   const result: Point[] = [];

  //   for (let i = 1; i < points.length - 2; i++) {
  //     // Mittelpunkte berechnen (Punkt auf halba stregge zwischen 2 gegebenen Punkten)
  //     const xc = (points[i].x + points[i + 1].x) / 2;
  //     const yc = (points[i].y + points[i + 1].y) / 2;

  //     // this.ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

  //     result.push({ x: xc, y: yc });
  //   }
  //   return result;
  // }

  public startAnimatedBezierCurve(startPoint: { x0: number, y0: number } = { x0: 0, y0: 0 }): void {
    if (!this.ctx) return;

    console.log('TODO: start next animation if points available');

    if (this.lastCurvePointIndex > this.trackedPoints.length - 3) {
      console.log('continue drawing');
      this.draw();
    }
    else {
      console.log('restart curve');
      this.animateCurve(this.trackedPoints, this.lastCurvePointIndex);
    }
  }


  /**
 * Animates bezier-curve
 *
 * @param ctx       The canvas context to draw to
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the control point
 * @param y1        The y-coord of the control point
 * @param x2        The x-coord of the end point
 * @param y2        The y-coord of the end point
 * @param duration  The duration in milliseconds
 */
  private animatePathDrawing(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, duration: number, progress: number) {
    var start: number | null = null;

    var step = (timestamp: number) => {
      if (start === null)
        start = timestamp;

      var delta = timestamp - start;
      progress = Math.min(delta / duration, 1);

      if (!this.canvas || !this.ctx) return;

      this.drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
      else {
        this.startAnimatedBezierCurve({ x0: x2, y0: y2 });
      }
    };

    window.requestAnimationFrame(step);
  }

  /**
  * Draws a splitted bezier-curve
  *
  * @param ctx       The canvas context to draw to
  * @param x0        The x-coord of the start point
  * @param y0        The y-coord of the start point
  * @param x1        The x-coord of the control point
  * @param y1        The y-coord of the control point
  * @param x2        The x-coord of the end point
  * @param y2        The y-coord of the end point
  * @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
  * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
  */
  private drawBezierSplit(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, t0: number, t1: number) {
    ctx.strokeStyle = '#000000';
    ctx.beginPath();

    if (0.0 == t0 && t1 == 1.0) {
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(x1, y1, x2, y2);
    } else if (t0 != t1) {
      var t00 = t0 * t0,
        t01 = 1.0 - t0,
        t02 = t01 * t01,
        t03 = 2.0 * t0 * t01;

      var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
        ny0 = t02 * y0 + t03 * y1 + t00 * y2;

      t00 = t1 * t1;
      t01 = 1.0 - t1;
      t02 = t01 * t01;
      t03 = 2.0 * t1 * t01;

      var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
        ny2 = t02 * y0 + t03 * y1 + t00 * y2;

      var nx1 = this.lerp(this.lerp(x0, x1, t0), this.lerp(x1, x2, t0), t1),
        ny1 = this.lerp(this.lerp(y0, y1, t0), this.lerp(y1, y2, t0), t1);

      ctx.moveTo(nx0, ny0);
      ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
    }

    ctx.stroke();
    ctx.closePath();
  }

  /**
  * Linearly interpolates between two numbers
  */
  private lerp(v0: number, v1: number, t: number) {
    return (1.0 - t) * v0 + t * v1;
  }
}
