import { Component, OnInit, ElementRef } from '@angular/core';
import { PixiService } from '../services/pixi.service';


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
    this.pixiService.init(this.elementRef);
  }
}
