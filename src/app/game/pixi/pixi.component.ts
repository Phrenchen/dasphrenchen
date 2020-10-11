import { Component, OnInit, ElementRef } from '@angular/core';
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
  }
}
