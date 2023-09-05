import { Injectable } from '@angular/core';
import { Question } from '../Model/question';
import { BehaviorSubject } from 'rxjs';
import { DataInput } from './data-input';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedType: string = '';
  filteredQuestionsLPI101: Question[] = [];
  filteredQuestionsLPI102: Question[] = [];
  questions: Question[] = [];
  qustionTypesToShow: string[] = [];

  constructor(
    private mainService: DataInput,
  ) {

  }

  private selectedTypeSource = new BehaviorSubject<string>(''); // Initialwert
  selectedType$ = this.selectedTypeSource.asObservable();

  setQuestionTypesToShow(questionTypes: string[]): void {
    this.qustionTypesToShow = questionTypes;
  }

  setSelectedType(selectedType: string): void {
    this.selectedTypeSource.next(selectedType);
    this.updateFilteredQuestions(selectedType);
  }

  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  filterByQuestionsTypes(questions: Question[], questionType: string): Question[] {
    console.log(questions,'Questions');
    console.log(this.questions,'Katalog');

    const filtered = questions.filter(question => question.questionType == questionType)

    console.log(questionType,'Filtered');
    console.log(filtered,'Filtered');
    return filtered;
  }

  updateFilteredQuestions(selectedType: string): void {
    this.mainService.getQuestion1().subscribe(questionsLPI101 => {
      this.filteredQuestionsLPI101 = this.filterByQuestionsTypes(questionsLPI101, selectedType);
    });

    this.mainService.getQuestion2().subscribe(questionsLPI102 => {
      const filteredQuestionsLPI102 = this.filterByQuestionsTypes(questionsLPI102, selectedType);
      this.filteredQuestionsLPI102 = filteredQuestionsLPI102;
    });
  }


}
