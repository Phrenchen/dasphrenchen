import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Question } from '../interfaces/question';
import { QuestionDataService } from './question-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private readonly questionDataService: QuestionDataService) { }


  public getData(): Observable<Question[]> {
    return this.questionDataService.getAllQuestions()
      .pipe(
        shareReplay()
      );
  }
}
