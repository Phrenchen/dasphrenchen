import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnimationsComponent } from './container/animations/animations.component';
import { LearningByDoingComponent } from './container/learning-by-doing/learning-by-doing.component';
import { MemoryGameComponent } from './container/memory-game/memory-game.component';
import { FeedComponent } from './container/my-feeds/feed/feed.component';
import { MyFeedsComponent } from './container/my-feeds/my-feeds.component';
import { MyTubeComponent } from './container/my-tube/my-tube.component';
import { ManuallyActivated } from './interfaces/ManuallyActivated';

@Component({
  selector: 'dph-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.less']
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnDestroy {

  public form: FormGroup;
  public playgroundControl:FormControl = new FormControl('Ants', []);

  public playgrounds$: Observable<any[]> = of([
    'Ants',
    'Animations',
    'Feeds',
    'Memory',
    'Learning By Doing'
  ]);

  public selectedPlayground: string = '';

  constructor() {
    this.form = new FormGroup({
      playground: this.playgroundControl,
    });

    this.playgroundControl.valueChanges.pipe(
      tap(changes => {
        console.log({changes});

      })
    ).subscribe();
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }
  // life cycle end



}
