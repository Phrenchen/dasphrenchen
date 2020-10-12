import { Component, Input, OnInit } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FeedActions } from './enums/feed-actions.enum';


@Component({
  selector: 'dph-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() images: string[] = [];

  private static readonly COMPACT: string = 'compact';
  private static readonly EXPANDED: string = 'expanded';
  private static readonly EDIT: string = 'edit';

  private showViewModeSwitch$$: Subject<boolean> = new Subject<boolean>();
  public _showViewModeSwitch: boolean = false;
  public viewMode: string = FeedComponent.COMPACT;
  public feedAction: string = FeedActions.NONE;

  public get showViewModeSwitch(): boolean {
    return this._showViewModeSwitch || this.viewMode === FeedComponent.EDIT;
  }

  constructor() {
    this.showViewModeSwitch$$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe((result) => {
        this._showViewModeSwitch = result;
      });

  }

  ngOnInit(): void { }

  public updateFeed(): void {
    console.log('update feed');
  }

  public onFeedAction(action: string): void {
    console.log('onFeedAction', action);

    switch (action) {
      case FeedActions.MINIMIZE:
        this.viewMode = FeedComponent.COMPACT;
        break;
      case FeedActions.MAXIMIZE:
        this.viewMode = FeedComponent.EXPANDED;
        break;
      case FeedActions.EDIT:
        this.viewMode = FeedComponent.EDIT;
        break;
      case FeedActions.CLOSE:
        console.log('"close" feed');
        break;
    }
  }

  public mouseOver(event: Event): void {
    // console.log('mouse over ', event.target);
    // const htmlTarget: HTMLElement = event.target as HTMLElement;

    // if(htmlTarget.classList.contains('feed-wrapper')) {
    this.showViewModeSwitch$$.next(true);
    // }
  }

  public mouseOut(event: Event): void {
    // console.log('mouse out ', event.target);
    // const htmlTarget: HTMLElement = event.target as HTMLElement;

    // if(htmlTarget.classList.contains('feed-wrapper')) {
    this.showViewModeSwitch$$.next(false);
    // }
  }
}
