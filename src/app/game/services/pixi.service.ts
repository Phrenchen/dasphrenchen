import { Injectable, NgZone, ElementRef, HostListener } from '@angular/core';
import { Application, Loader, Sprite } from 'pixi.js';
import { Unit } from '../interfaces/Unit';

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  public app: Application | null = null;
  private elementRef: ElementRef | null = null;

  public devicePixelRatio = window.devicePixelRatio || 1;

  constructor(
    private ngZone: NgZone,
  ) { }

  public init(elementRef: ElementRef): void {

    this.elementRef = elementRef;

    this.ngZone.runOutsideAngular(() => {
      this.app = new Application(
        {
          width: 256,         // default: 800
          height: 256,        // default: 600
          antialias: true,    // default: false
          transparent: true, // default: false
          resolution: 1       // default: 1
        }
      );
      this.app.renderer.backgroundColor = 0x000000;
    });

    if (!this.app) {
      return;
    }

    this.elementRef.nativeElement.appendChild(this.app.view);

    this.app.stage.interactive = true;

    this.resize();
  }

  // LOOP
  public update(): void {
    this.app?.renderer.render(this.app.stage);
  }
  
  // LOOP end

  public createUnit(unit: Unit): void {
    const texture = Loader.shared.resources[unit.id].texture;
    const sprite = new Sprite(texture);
    unit.sprite = sprite;

    this.app?.stage.addChild(sprite);
  }

  // @HostListener('window:resize')
  public resize() {
    if (!this.app) {
      return;
    }

    // const width = this.elementRef.nativeElement.offsetWidth;
    // const height = this.elementRef.nativeElement.offsetHeight;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const viewportScale = 1 / this.devicePixelRatio;
    this.app.renderer.resize(vw * this.devicePixelRatio, vh * this.devicePixelRatio);
    this.app.view.style.transform = `scale(${viewportScale})`;
    this.app.view.style.transformOrigin = `top left`;
  }
}
