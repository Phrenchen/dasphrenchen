import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StackComponent } from './components/stack/stack.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'stack',
    component: StackComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },

  {
    /*
      Wildcard redirected standardmäßig auf Login
      Ist der User Eingeloggt, schiebt der Login Guard den User auf die orders Page
    */
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
