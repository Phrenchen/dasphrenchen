import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { LoginService } from 'src/app/services/login.service';
import { UserStatusEnum } from 'src/app/interfaces/UserStatusEnum';
import { filter, take } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'dph-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  public currentPage: string = 'home';

  public userStatus: UserStatusEnum = UserStatusEnum.loggedOut;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.currentPage = this.router.url === '/' ? '/home' : this.router.url;

    this.router.events
      .pipe(filter((change) => change instanceof NavigationEnd))
      .subscribe((result) => {
        this.currentPage = (result as NavigationEnd).url;

        if(this.currentPage === '/') {
          this.currentPage = 'home';
        }
      });
  }

  public isActiveRoute(route: string): boolean {
    return this.currentPage.indexOf(route) >= 0;
  }

  public goto(pageName: string): void {
    this.router.navigate([pageName]);
  }

  public showLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: { name: '', password: '' },
    });

    dialogRef.afterClosed().subscribe((result: UserLogin) => {
      this.userStatus = UserStatusEnum.statusPending;

      // DEBUG LOGIN without data!
      if (!result || !result.name || !result.password) {
        setTimeout(() => {
          this.userStatus = UserStatusEnum.loggedIn;
        }, 2000);
      } else {
        setTimeout(() => {
          this.loginService
            .login(result.name, result.password)
            .pipe(take(1))
            .subscribe((result) => {
              console.log('header: logged in!', result);

              this.userStatus = result
                ? UserStatusEnum.loggedIn
                : UserStatusEnum.loggedOut;
            });
        }, 2000);
      }
    });
  }
}
