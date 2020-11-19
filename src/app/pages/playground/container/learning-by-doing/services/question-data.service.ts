import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question, QuestionType } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  constructor() { }


  public getAllQuestions(): Observable<Question[]> {
    const data: Question[] = [
      {
        title: 'Zahlen sortieren',
        description: 'Sortiere die Zahlen aufsteigend, indem du sie der Reihe nach antippst.',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        answers: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        type: QuestionType.shortNumber
      },
      {
        title: 'VOKALE VOKALE!',
        description: 'Findest du die Vokale A, E, I, O und U?',
        options: ['A', 'E', 'I', 'O', 'U', 's', 't', 'k', 'c', 'm', 'j', 'h'],
        answers: ['A', 'E', 'I', 'O', 'U'],
        type: QuestionType.shortText
      },
      {
        title: 'Zahlen sortieren anders herum',
        description: 'Sortiere die Zahlen von absteigend, indem du sie der Reihe nach antippst.',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        answers: ['9', '8', '7', '6', '5', '4', '3', '2', '1'],
        type: QuestionType.shortNumber
      }
    ];
    return of(data);
  }
}
