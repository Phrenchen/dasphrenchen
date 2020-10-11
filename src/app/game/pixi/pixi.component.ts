import { Component, OnInit, ElementRef, NgZone, HostListener, Input } from '@angular/core';
import { Application, Loader, Sprite } from 'pixi.js';
import { UnitService } from '../services/unit.service';
import { Unit } from '../interfaces/Unit';
import { PixiService } from '../services/pixi.service';

let self: PixiComponent;

@Component({
  selector: 'dph-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.less']
})
export class PixiComponent implements OnInit {
  

  constructor(
    private elementRef: ElementRef,
    private pixiService: PixiService,
  ) { }

  ngOnInit(): void {
    self = this;
    this.pixiService.init(this.elementRef);

    // this.ngZone.runOutsideAngular(() => {
    //   this.app = new Application(
    //     {
    //       width: 256,         // default: 800
    //       height: 256,        // default: 600
    //       antialias: true,    // default: false
    //       transparent: false, // default: false
    //       resolution: 1       // default: 1
    //     }
    //   );
    //   this.app.renderer.backgroundColor = 0xade7d6;
    // });

    // if (!this.app) {
    //   return;
    // }

    // this.elementRef.nativeElement.appendChild(this.app.view);

    // this.app.stage.interactive = true;

    // this.resize();

    // this.animationLoop();
  }

  



  

}
