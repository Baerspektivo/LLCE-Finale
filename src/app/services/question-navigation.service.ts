import { Injectable } from '@angular/core';
import { TrueOrFalesService } from './true-or-false.service';
import { Question } from '../Model/question';
import { AnswerData } from '../Model/answer-data';
import { PopupService } from './popup.service';
import { StatistikService } from './statistik.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QuestionNavigationService {
  private currentQuestionIndex: number = 0;
  private currentQuestion!: Question;
  private isFirstQuestion: boolean = true;
  private isLastQuestion: boolean = false;
  private answeredQuestions: boolean[] = [];
  private totalQuestions: number = 0;
  private answerData: AnswerData[] = [];

  constructor(
    private trueOrFalseService: TrueOrFalesService,
    private popupServ: PopupService,
    private statistServ: StatistikService,
    private router: Router
  ) {}

  initializeNavigation(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
    this.currentQuestionIndex = 0;
    this.isFirstQuestion = true;
    this.isLastQuestion = totalQuestions === 1;
  }

  private recordAnswerData(userAnswer: string, isAnswerCorrect: boolean): void {
    this.answerData.push({
      question: this.trueOrFalseService.getCurrentQuestion(),
      userAnswer: userAnswer,
      isCorrect: isAnswerCorrect,
    });
  }

  moveNextQuestionCheckMode(): void {
    const currentAnswers = this.trueOrFalseService.getCurrentAnswers();
    const userAnswer = currentAnswers.userAnswer;
    if (!this.isLastQuestion) {
      //Überprüfen ob die Antwort korrekt ist
      if (this.shouldSkipQuestion(userAnswer)) {
        if (this.trueOrFalseService.getSkipped()) {
          this.statistServ.incrementCounterOfSkip();
          this.moveNextQuestionWithOutCheck();
          this.trueOrFalseService.setSkipped(false);
        } else {
          this.popupServ.dontMoveWitNowAnswer();
        }
      } else {
        const isAnswerCorrect = this.trueOrFalseService.checkAnswer(userAnswer);
        this.evalueteAnswer(userAnswer, isAnswerCorrect);
      }
    } else {
      if (this.shouldSkipQuestion(userAnswer)) {
        if (this.trueOrFalseService.getSkipped()) {
          this.statistServ.incrementCounterOfSkip();
          this.moveNextQuestionWithOutCheck();
          this.trueOrFalseService.setSkipped(false);
        } else {
          this.popupServ.dontMoveWitNowAnswer();
        }
      } else {
        const isAnswerCorrect = this.trueOrFalseService.checkAnswer(userAnswer);
        this.evalueteAnswer(userAnswer, isAnswerCorrect);
      }
    }
  }

  shouldSkipQuestion(userAnser: string): boolean {
    return userAnser === undefined || userAnser.trim() === '';
  }

  evalueteAnswer(userAnswer: string, isAnswerCorrect: boolean): void {
    this.recordAnswerData(userAnswer, isAnswerCorrect);

    if (isAnswerCorrect) {
      this.statistServ.incrementCounterOfCorrect();

      if (this.isLastQuestion) {
        this.endExam();
      } else {
        this.forwardQuestion();
      }
    } else {
      //Answer is wrong
      if (this.statistServ.getCounterOfIncorrect() === 6) {
        this.popupServ.backToLearningCenterCheck();
      } else{
        this.statistServ.incrementCounterOfIncorrect();
        this.popupServ.wrongAnswerMessage();
      }

      if (this.isLastQuestion) {
        this.popupServ.wrongAnswerMessage();
        this.statistServ.incrementCounterOfIncorrect();
        this.previusQuestion();
      } else{
        this.previusQuestion();
      }
    }
    }


  forwardQuestion(): void {
    const currentIndex = this.trueOrFalseService.getCurrentQuestionIndex();
    if (
      !(
        this.trueOrFalseService.getCurrentQuestionIndex() ===
        this.totalQuestions - 1
      )
    ) {
      this.trueOrFalseService.incrementQuestionIndex();
      this.isFirstQuestion = false;
      this.isLastQuestion = currentIndex === this.totalQuestions - 1;
      this.loadCurrentQuestion();
    }
  }

  previusQuestion(): void {
    const currentIndex = this.trueOrFalseService.getCurrentQuestionIndex();
    if (currentIndex > 0  ) {
      this.trueOrFalseService.decrementQuestionIndex();
      this.isFirstQuestion = currentIndex === 1;
      this.isLastQuestion = currentIndex === this.totalQuestions - 1;
    }
  }


  moveNextQuestionWithOutCheck(): void {
    if (!this.isLastQuestion) {
      this.trueOrFalseService.incrementQuestionIndex();
      this.isFirstQuestion = false;
      this.isLastQuestion =
        this.trueOrFalseService.getCurrentQuestionIndex() ===
        this.totalQuestions - 1;
      this.loadCurrentQuestion();
    }
  }

  skipQuestion(): void {
    if (!this.isLastQuestion) {
      this.trueOrFalseService.setSkipped(true);
      this.trueOrFalseService.updateCurrentAnswers({
        selectedChoice: [],
        userAnswer: '',
      });
      this.moveNextQuestionCheckMode();
    }
  }

  movePreviusQuestion(): void {
    if (!this.isFirstQuestion) {
      const currentAnswers = this.trueOrFalseService.getCurrentAnswers();
      this.trueOrFalseService.updateCurrentAnswers(currentAnswers);
      this.trueOrFalseService.decrementQuestionIndex();
      this.isFirstQuestion =
        this.trueOrFalseService.getCurrentQuestionIndex() === 0;
      this.isLastQuestion = false;
      this.loadCurrentQuestion();
    }
  }

  moveNextQuestionExamMode(): void {
    const currentAnswers = this.trueOrFalseService.getCurrentAnswers();
    const userAnswer = currentAnswers.userAnswer;
    if (!this.isLastQuestion) {
      //Überprüfen ob die Antwort korrekt ist

      if (this.shouldSkipQuestion(userAnswer)) {

        if (this.trueOrFalseService.getSkipped()) {
          this.statistServ.incrementCounterOfSkip();
          this.trueOrFalseService.setSkipped(false);
        } else {
          this.skipQuestion();
        }
      } else {
        const isAnswerCorrect = this.trueOrFalseService.checkAnswer(userAnswer);
        this.evalueteAnswerExam(userAnswer, isAnswerCorrect);
      }
    } else {
      if (this.shouldSkipQuestion(userAnswer)) {
        if (this.trueOrFalseService.getSkipped()) {
          this.statistServ.incrementCounterOfSkip();
          this.trueOrFalseService.setSkipped(false);
        } else {
          this.skipQuestion();
        }
      }
      this.evalueteAnswerExam(userAnswer,this.trueOrFalseService.checkAnswer(userAnswer));
    }
  }

  evalueteAnswerExam(userAnswer: string, isAnswerCorrect: boolean): void {
    this.recordAnswerData(userAnswer, isAnswerCorrect);

    if (isAnswerCorrect) {
      //Answer is correct
      this.statistServ.incrementCounterOfCorrect();
    } else {
      //Answer is incorrect
      this.statistServ.incrementCounterOfIncorrect();
      this.twentyPercentThrsholdRule();
    }
    if(this.isLastQuestion){
      this.endExam();
    }else{
      this.forwardQuestion();
    }
  }

  twentyPercentThrsholdRule(): void{
    const incorrectAnswers = this.statistServ.getCounterOfIncorrect();
    const totalQuestions = this.trueOrFalseService.getKatalog1().length;
    const twentyPercentThrshold = totalQuestions * 0.2;

    if (incorrectAnswers >= twentyPercentThrshold) {
      this.popupServ.backToLearningCenterExam();
    } else {
      if (this.thisIsLastQuestion()) {
        this.endExam();
      }
    }
  }

  endExam(): void {
    this.popupSaticMessages()
  }

  thisIsLastQuestion(): boolean {
    if (
      this.trueOrFalseService.getCurrentQuestionIndex() ===
      this.trueOrFalseService.getKatalog1().length - 1
    ) {
      this.isLastQuestion = true;
      return this.isLastQuestion;
    } else {
      return false;
    }
  }

  thisIsFirstQuesteion(): boolean {
    return this.isFirstQuestion;
  }

  getCurrentQuestion(): Question {
    return this.trueOrFalseService.getKatalog1()[
      this.trueOrFalseService.getCurrentQuestionIndex()
    ];
  }

  setCurrentQuestion(question: Question): void {
    this.currentQuestion = question;
  }

  loadCurrentQuestion(): void {
    const currentQuestion = this.trueOrFalseService.getCurrentQuestion();
    if (currentQuestion) {
      this.setCurrentQuestion(currentQuestion);
    }
  }

  markQuestionAnswered(index: number): void {
    if (index >= 0 && index < this.answeredQuestions.length) {
      this.answeredQuestions[index] = true;
    }
  }

  hasQuestionBeenAnswered(index: number): boolean {
    if (index >= 0 && index < this.answeredQuestions.length) {
      return this.answeredQuestions[index];
    }
    return false;
  }

  popupSaticMessages():void{
    const totalQuestions = this.trueOrFalseService.getKatalog1().length;
    const correctCounter = this.statistServ.getCounterOfCorrect();
    const incorrectCounter = this.statistServ.getCounterOfIncorrect();
    const skipCount = this.statistServ.getCounterOfSkip();

    const message = `Total number of questions: ${totalQuestions}\nCorrectly answered: ${correctCounter}\nIncorrectly answered: ${incorrectCounter}\nSkipped: ${skipCount}`;
    this.popupServ.openStatisticPopup(message);
  }
}
