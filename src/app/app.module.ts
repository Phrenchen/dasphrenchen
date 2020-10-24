import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StackComponent } from './pages/stack/stack.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GameService } from './game/services/game.service';

// Materials
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameModule } from './game/game.module';
import { from } from 'rxjs';
import { ViewModeSwitchComponent } from './components/basics/view-mode-switch/view-mode-switch.component';
import { FeedComponent } from './components/feed/feed.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeedService } from './services/feed.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MyFeedsComponent } from './container/my-feeds/my-feeds.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StackComponent,
    AboutComponent,
    HelpComponent,
    HeaderComponent,
    ViewModeSwitchComponent,
    FeedComponent,
    MyFeedsComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    GameModule,

    // Materials
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  providers: [HttpClient, GameService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
