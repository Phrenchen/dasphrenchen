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
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {GameModule} from './game/game.module';
import { from } from 'rxjs';
import { ViewModeToggleComponent } from './components/basics/view-mode-toggle/view-mode-toggle.component';
import { ViewModeSwitchComponent } from './components/basics/view-mode-switch/view-mode-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StackComponent,
    AboutComponent,
    HelpComponent,
    HeaderComponent,
    ViewModeToggleComponent,
    ViewModeSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    GameModule,

    // Materials
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
