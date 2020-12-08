import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Question } from './interfaces/question';
import { QuestionService } from './services/question.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';

import { ManuallyActivated } from './../../interfaces/ManuallyActivated';

@Component({
  selector: 'dph-learning-by-doing',
  templateUrl: './learning-by-doing.component.html',
  styleUrls: ['./learning-by-doing.component.less']
})
export class LearningByDoingComponent implements OnInit, ManuallyActivated {

  private isDeactivated$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isDeactivated$: Observable<boolean> = this.isDeactivated$$.asObservable();

  public questions$: Observable<Question[]> = of([]);

  public selectedQuestion$$: ReplaySubject<Question> = new ReplaySubject<Question>();
  public selectedQuestion$: Observable<Question> = this.selectedQuestion$$.asObservable();

  validAnswers: any[] = [];
  givenAnswers: any[] = [];

  constructor(private readonly questionService: QuestionService) { }

  ngOnInit(): void {
    this.activate();
  }
  // life cycle end

  // ManuallyActivated
  public activate(): void {
    this.isDeactivated$$.next(false);

    this.questions$ = this.questionService.getData();

    this.questions$.pipe(
      tap(result => {
        this.validAnswers = result[0].answers;
        this.selectedQuestion$$.next(result[0])   // select first question
      }),
    ).subscribe();
  }

  public deactivate(): void {
    this.isDeactivated$$.next(true);
  }
  // ManuallyActivated end

  public selectQuestion(question: Question): void {
    this.validAnswers = question.answers;
    this.givenAnswers = [];
    this.selectedQuestion$$.next(question);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  /** Predicate function that only allows correct answers to be dropped into a list. */
  correctAnswerPredicate = (item: CdkDrag<any>) => {
    return this.validAnswers.indexOf(item.data) >= 0;
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
