import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game/services/game.service';

@Component({
  selector: 'dph-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() isGameActive: boolean = false;
  @Output() gameActiveState: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
  }

  public goto(pageName: string): void {
    this.router.navigate([pageName]);
  }

  // game
  public startGame(): void {
    this.gameService.start();
    this.gameActiveState.emit(true);
  }
  
  public stopGame(): void {
    this.gameService.pause();
    this.gameActiveState.emit(false);
    
  }
}
