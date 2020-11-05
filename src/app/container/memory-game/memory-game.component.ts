import { Component, OnInit } from '@angular/core';
import { MemoryGameService } from './services/memory-game.service';

@Component({
  selector: 'dph-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.less']
})
export class MemoryGameComponent implements OnInit {

  public selectedDifficulty: string = 'Mittel';
  public difficulties: string[] = ['Leicht', 'Mittel', 'Schwer'];

  constructor(private readonly gameService: MemoryGameService) { }

  ngOnInit(): void {
  }

}
