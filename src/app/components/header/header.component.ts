import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dph-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goto(pageName: string): void {
    this.router.navigate([pageName]);
  }
}
