import { Component, OnInit, Input } from '@angular/core';
import { PixiService } from '../services/pixi.service';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'dph-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  @Input() isGameActive: boolean = true;

  constructor(private pixiService: PixiService) {
  }

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(100)
      )
      .subscribe({
        next: () => {
          this.pixiService.resize();
        },
      });
  }
  // LIFE CYCLE end


}
