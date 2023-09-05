import { Injectable } from '@angular/core';
import { TrueOrFalesService } from './true-or-false.service';
import { FrageOption } from '../Model/frage-option';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionToggleService {
  private showAnswer: boolean = false;
  private shuffleEnabled: boolean = false;
 

  constructor(
    private trueFalse: TrueOrFalesService,
    ) { }

  toggleChoiceSelectionSingle(choice: FrageOption) {
    const currentQuestion = this.trueFalse.getCurrentQuestion();
    if (currentQuestion) {
      currentQuestion.choices.map((c) => (c.selected = false));
      choice.selected = !choice.selected;
      this.trueFalse.updateCurrentAnswers({
        selectedChoice: currentQuestion.choices,
        userAnswer: currentQuestion.answer as string,
      });
    }
  }

  toggleChoiceSelectionMulti(choice: FrageOption) {
    const currentQuestion = this.trueFalse.getCurrentQuestion();
    if (currentQuestion) {
      choice.selected = !choice.selected;

      const selectedChoices = currentQuestion.choices.filter((c) => c.selected);

      this.trueFalse.updateCurrentAnswers({
        selectedChoice: selectedChoices,
        userAnswer: currentQuestion.answer as string,
      });
    }
  }

  toggleInputAnswer(answer: string | undefined) {
    if (answer !== undefined) {
      const currentQuestion = this.trueFalse.getCurrentQuestion();
      if (currentQuestion) {
        const normalizedUserAnswer = this.trueFalse.normalizeUserAnswer(answer);
        if (normalizedUserAnswer !== undefined) {
          this.trueFalse.setCurrentAnswers(normalizedUserAnswer);
        } else {
          console.log('Normalized answer is undefined.'); // Handle undefined normalized answer
        }
      }
    } else {
      console.log('Answer is undefined.'); // Handle undefined answer
    }
  }

  toggleAnswerVisibility(): void{
    this.showAnswer = !this.showAnswer;
  }
  getShowAnswer(): boolean{
    return this.showAnswer;
  }

}
