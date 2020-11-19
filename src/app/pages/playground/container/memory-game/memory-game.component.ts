import { Component, OnInit } from '@angular/core';
import { MemoryGameService } from './services/memory-game.service';

import { ManuallyActivated } from './../../interfaces/ManuallyActivated';


@Component({
  selector: 'dph-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.less']
})
export class MemoryGameComponent implements OnInit, ManuallyActivated {

  public selectedDifficulty: string = 'Mittel';
  public difficulties: string[] = ['Leicht', 'Mittel', 'Schwer'];

  constructor(private readonly gameService: MemoryGameService) { }

  ngOnInit(): void {
  }
  // life cycle end

  // ManuallyActivated
  public activate(): void {
    // console.log('activated memory game');
  }
  public deactivate(): void {
    // console.log('deactivated memory game');

  }
  // ManuallyActivated end
}
