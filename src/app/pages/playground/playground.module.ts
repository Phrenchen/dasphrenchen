import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';

import { MyFeedsComponent } from './container/my-feeds/my-feeds.component';
import { MyTubeComponent } from './container/my-tube/my-tube.component';
import { MemoryGameComponent } from './container/memory-game/memory-game.component';
import { LearningByDoingComponent } from './container/learning-by-doing/learning-by-doing.component';
import { ViewModeSwitchComponent } from './container/my-feeds/view-mode-switch/view-mode-switch.component';
import { FeedComponent } from './container/my-feeds/feed/feed.component';

import { MemoryGameService } from './container/memory-game/services/memory-game.service';
import { FeedService } from './services/feed.service';
import { UserService } from './services/user.service';
import { YoutubeService } from './services/youtube.service';
import { QuestionService } from './container/learning-by-doing/services/question.service';
import { QuestionDataService } from './container/learning-by-doing/services/question-data.service';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent
  }
];

@NgModule({
  declarations: [
    ViewModeSwitchComponent,
    FeedComponent,
    MyFeedsComponent,
    PlaygroundComponent,
    MyTubeComponent,
    MemoryGameComponent,
    LearningByDoingComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    // Materials
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,

    // CDK
    DragDropModule,
  ],
  providers: [
    FeedService,
    YoutubeService,
    UserService,
    MemoryGameService,
    QuestionService,
    QuestionDataService,
  ]
})
export class PlaygroundModule { }
