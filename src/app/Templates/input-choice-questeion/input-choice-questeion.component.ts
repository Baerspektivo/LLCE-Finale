import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { QuestionToggleService } from '../../services/question-toggle.service';
import { TrueOrFalesService } from '../../services/true-or-false.service';


@Component({
  selector: 'LL-input-choice-question',
  templateUrl: './input-choice-questeion.component.html',
  styleUrls: ['./input-choice-questeion.component.css']
})
export class InputChoiceQuesteionComponent {
  @Input() userAnswer: string | undefined;
  @Output() userAnswerChange = new EventEmitter<string>();

  inputUserAnswer: string = '';

  constructor(
    private trueFalse: TrueOrFalesService,
    ) {

  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['userAnswer']){
      this.inputUserAnswer = this.userAnswer || '';
    }
  }

  onInputUserAnswerChange(): void{
    const currentAnswers = this.trueFalse.getCurrentAnswers();
    currentAnswers.userAnswer = this.inputUserAnswer || '';
    this.trueFalse.updateCurrentAnswers(currentAnswers);

    this.userAnswerChange.emit(this.inputUserAnswer);
  }
}
