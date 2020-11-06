import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
export class PlaygroundComponent implements OnInit, AfterViewChecked {

  @ViewChild(MyTubeComponent) myTube: MyTubeComponent | undefined;
  @ViewChild(LearningByDoingComponent) learningByDoing: LearningByDoingComponent | undefined;
  @ViewChild(MemoryGameComponent) memoryGame: MemoryGameComponent | undefined;
  @ViewChild(MyFeedsComponent) feeds: MyFeedsComponent | undefined;
  
  private tabComponents: any[] = [];
  private activeTab: ManuallyActivated | null = null;

  constructor() {
  }
  
  
  ngOnInit(): void { 
  }
  
  ngAfterViewChecked(): void {
    // unschön: reihenfolge der tabs hier und im HTML definieren
    this.tabComponents = [
      this.myTube,
      this.learningByDoing as ManuallyActivated,
      this.memoryGame as ManuallyActivated,
      this.feeds as ManuallyActivated
    ]
    
  }
  // life cycle end

  public selectedTabChange(event: MatTabChangeEvent): void {
    console.log('selectedTabChange', event);

    if(this.activeTab) {
      this.activeTab.deactivate();
    }

    this.activeTab = this.tabComponents[event.index];
    if(this.activeTab) {
      this.activeTab.activate();
    }

  }
}
