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
import { FeedService } from './container/my-feeds/services/feed.service';
import { UserService } from './container/my-feeds/services/user.service';
import { YoutubeService } from './container/my-tube/services/youtube.service';
import { QuestionService } from './container/learning-by-doing/services/question.service';
import { QuestionDataService } from './container/learning-by-doing/services/question-data.service';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

import { AnimationsComponent } from './container/animations/animations.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { FoodGameComponent } from './container/food-game/food-game.component';

import { AntFactoryService } from './container/food-game/services/ant-factory/ant-factory.service';
import { AntsConfigService } from './container/food-game/services/ants-config/ants-config.service';
import { AntGameService } from './container/food-game/services/ant-game.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
  },
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
    AnimationsComponent,
    FoodGameComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    HighchartsChartModule,

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
    MatSelectModule,
    MatExpansionModule,
    MatSliderModule,

    TranslocoRootModule,

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
    AntsConfigService,
    AntFactoryService,
    AntGameService,
  ],
})
export class PlaygroundModule {}
