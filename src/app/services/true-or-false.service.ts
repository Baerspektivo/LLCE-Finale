import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError,tap } from 'rxjs';
import { Question } from '../Model/question';
import { DataInput } from './data-input';
import { Answers } from '../Model/answers';



@Injectable({
  providedIn: 'root',
})
export class TrueOrFalesService {
  private katalog1: Question[] = [];
  private katalog2: Question[] = [];
  private answer: Answers[] = [];
  private currentQuestionIndex: number = 0;
  public isLastQuestion: boolean = true;
  public isFirstQuestion: boolean = false;
  private skipped: boolean = false;
  private userAnswer:string = '';
  private shuffleEnabled: boolean = false;

  constructor(
    private fragenService: DataInput,
    private http: HttpClient,
  ) {
  }

  initializeAnswer(): void {
    this.answer = this.katalog1.map(() => ({
      selectedChoice: [],
      userAnswer: '',
    }));
  }

   setQuestionsAndAnswers(questions: Question[]): void {
     this.katalog1 = questions;
     this.isFirstQuestion = true;
     this.isLastQuestion = this.katalog1.length === 1;
     this.initializeAnswer();


   }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  setCurrentQuestionIndex(index: number):void  {
    this.currentQuestionIndex = index;
  }

  incrementQuestionIndex():void{
    this.currentQuestionIndex++;
  }

  decrementQuestionIndex():void{
    this.currentQuestionIndex--;
  }

  getCurrentQuestion(): Question {
    return this.katalog1[this.getCurrentQuestionIndex()];
  }

  getCurrentAnswers(): Answers {
    const currentAnswers = this.answer[this.getCurrentQuestionIndex()];
    return currentAnswers || {selectedChoice: [], userAnswer: ''}
  }

  setCurrentAnswers(userAnswer: string): void {
    this.setUserAnswer(userAnswer);
    const currentAnswers = this.getCurrentAnswers();
    this.updateCurrentAnswers(currentAnswers);
  }

  setUserAnswer(userAnswer: string): void {
    this.userAnswer = userAnswer;
  }

  getUserAnswer(): string {
    return this.userAnswer;
  }

  updateCurrentAnswers(updatedAnswers: Answers): void {
    this.answer[this.getCurrentQuestionIndex()] = updatedAnswers;
  }

  private setKatalogAndQuestions(data: Question[]): void {
    this.katalog1 = data;
    this.currentQuestionIndex = 0;
    this.isLastQuestion = false;
    this.isFirstQuestion = true;
  }


    loadKatalogAndQuestions(): Observable<Question[]> {
     this.initializeAnswer()
      return this.http
        .get<Question[]>(this.fragenService.getKatalog1Url())
        .pipe(
          tap((data) => {
            this.setKatalogAndQuestions(data);
          }),
          catchError((error) => {
            console.log('Fehler beim Laden des Katalogs aufgetreten', error);
            return EMPTY;
          })
        );
    }

  loadKatalog2AndQuestions(): Observable<Question[]> {
    this.initializeAnswer()
    return this.http
      .get<Question[]>(this.fragenService.getKaltalog2Url())
      .pipe(
        tap((data) => {
          this.setKatalogAndQuestions(data);
        }),
        catchError((error) => {
          console.log('Fehler beim laden des Katalaogs aufgetreten', error);
          return EMPTY;
        })
      );
  }

  checkAnswer(userAnswer: string | string[]): boolean {
    const currentQuestion = this.getCurrentQuestion();

    //SingleChoiceQuestions
  if (currentQuestion.questionType === 'single') {
      return this.checkSingleChoiceAnswer(currentQuestion);
    //MultipleChoiceQuestions
  } else if (currentQuestion.questionType === 'multiple') {
    return this.checkMultipleChoiceAnswer(currentQuestion);
    //InputQuestions
  } else if (currentQuestion.questionType === 'input') {
    return this.checkInputAnswer(currentQuestion, userAnswer);
  }
    return false;
  }

  private checkSingleChoiceAnswer(question: Question): boolean{
    const selectedChoice = this.getCurrentAnswers().selectedChoice.find(choice => choice.selected);
    if (selectedChoice) {
      const selectedFirstLatter = selectedChoice.text[0];
      return selectedFirstLatter === question.answer;
    }
    return false;
  }

  private checkMultipleChoiceAnswer(qustion: Question): boolean{
    const selectedChoices = this.getCurrentAnswers().selectedChoice.filter(choice => choice.selected);
    const selectedTexts = selectedChoices.map(choice => choice.text[0]).sort().join('');
    const sortedCorrectAnswer = qustion.answer.toString().split('').sort().join('');
    return selectedTexts === sortedCorrectAnswer;
  }

  private checkInputAnswer(question: Question, userAnswer: string | string[]): boolean{
    const formattedCorrectAnswers = Array.isArray(question.answer)
      ? question.answer.map(answer => answer.trim().toLowerCase())
      : [question.answer.trim().toLowerCase()];

    const normalizeUserAnswer = this.normalizeUserAnswer(userAnswer)||'';
    const includes = formattedCorrectAnswers.includes(normalizeUserAnswer);
    return includes;
  }

    //Normalizsation
  normalizeUserAnswer(userAnswer: string | string[] | boolean): string | undefined {
    if (typeof userAnswer === 'boolean') {
      return [userAnswer.toString()].join('');
    } else if (Array.isArray(userAnswer)) {
      return userAnswer.map((answer: string | boolean) => (typeof answer === 'string' ? answer.trim() : answer.toString())).join('');
    } else if (userAnswer === undefined) {
      return undefined;
    } else {
      return [userAnswer.trim()].join('');
    }
  }

  compareInputAnswers(userAnswer: string, correctAnswers: string): boolean {
    const formattedUserAnswer = userAnswer.trim().replace(/\r?\n|\r/g, '');
    const formattedCorrectAnswers = correctAnswers
      .trim()
      .replace(/\r?\n|\r/g, '');
    return (
      formattedUserAnswer.toLowerCase() === formattedCorrectAnswers.toLowerCase()
    );
  }

  setSkipped(value: boolean): void{
    this.skipped = value;
  }
  getSkipped():boolean{
    return this.skipped;
  }
  getKatalog1(): Question[] {
  return this.katalog1;
  }
  getKatalog2(): Question[] {
    return this.katalog2;
  }


}
