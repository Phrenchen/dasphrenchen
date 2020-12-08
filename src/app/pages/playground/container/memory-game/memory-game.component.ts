import { Component, OnInit } from '@angular/core';
import { MemoryGameService } from './services/memory-game.service';

import { ManuallyActivated } from './../../interfaces/ManuallyActivated';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'dph-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.less'],
})
export class MemoryGameComponent implements OnInit, ManuallyActivated {
  public selectedDifficulty: string = 'Mittel';
  public difficulties: string[] = ['Leicht', 'Mittel', 'Schwer'];

  public secondCbCtrl: FormControl = new FormControl(true);
  public thirdCbCtrl: FormControl = new FormControl(false);

  constructor(private readonly gameService: MemoryGameService) {
    this.secondCbCtrl.valueChanges
    .pipe(
      tap(result => console.log({result}))
    )
    .subscribe(result => {
      console.log('subscribe', result);
    });
  }

  ngOnInit(): void {
    this.activate();
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
