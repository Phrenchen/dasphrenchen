import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/**
 * displays a row of buttons to switch the view mode of a visual component
 */
@Component({
  selector: 'dph-view-mode-switch',
  templateUrl: './view-mode-switch.component.html',
  styleUrls: ['./view-mode-switch.component.less']
})
export class ViewModeSwitchComponent implements OnInit {

  @Output() feedAction: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // PUBLIC
  public select(action: string): void {
    this.feedAction.emit(action);
  }

}
