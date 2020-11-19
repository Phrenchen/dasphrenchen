import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
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

  @ViewChild(MyTubeComponent) myTube: MyTubeComponent | null = null;
  @ViewChild(LearningByDoingComponent) learningByDoing: LearningByDoingComponent | null = null;
  @ViewChild(MemoryGameComponent) memoryGame: MemoryGameComponent | null = null;
  @ViewChild(MyFeedsComponent) feeds: MyFeedsComponent | null = null;
  @ViewChild(AnimationsComponent) animations: AnimationsComponent | null = null;


  public selectedTabIndex: number = 4;

  private tabComponents: any[] = [];
  private activeTab: ManuallyActivated | null = null;

  constructor() {
  }
  
  
  ngOnInit(): void { 
  }
  
  ngAfterViewInit(): void {
    this.tabComponents = [
      this.myTube,
      this.learningByDoing as ManuallyActivated,
      this.memoryGame as ManuallyActivated,
      this.feeds as ManuallyActivated,
      this.animations as ManuallyActivated,
    ]
    
    setTimeout(() => {
      this.activateTab(this.selectedTabIndex);
      
    }, 0);
    // unschön: reihenfolge der tabs hier und im HTML definieren
  }
  
  ngOnDestroy(): void {
    if(this.activeTab) 
      this.activeTab.deactivate();
  }
  // life cycle end

  public selectedTabChange(event: MatTabChangeEvent): void {
    if(event.index === this.selectedTabIndex) return;
    this.selectedTabIndex = event.index;
    this.activateTab(event.index);
  }

  private activateTab(index: number): void {
    if(this.activeTab) {
      this.activeTab.deactivate();
      // console.log('deactivated', this.activeTab);
    }

    this.activeTab = this.tabComponents[index];
    // console.log('activating', this.activeTab);
    if(this.activeTab) {
      this.activeTab.activate();
    }
  }
}
