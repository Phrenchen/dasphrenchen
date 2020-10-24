import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from 'src/app/services/feed.service';

import { Feed } from './../../interfaces/Feed';


@Component({
  selector: 'dph-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {


  constructor(private feedService: FeedService) {
   }

  ngOnInit(): void {
    
  }
}
