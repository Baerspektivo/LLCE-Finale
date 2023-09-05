import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FrageOption } from '../../Model/frage-option';
import { QuestionToggleService } from '../../services/question-toggle.service';

@Component({
  selector: 'LL-single-choice-question',
  templateUrl: './single-choice-questeion.component.html',
  styleUrls: ['./single-choice-questeion.component.css']
})
export class SingleChoiceQuestionComponent {
  @Input() choices: FrageOption[] | undefined;
  @Output() choiceSelectionToggle = new EventEmitter<FrageOption>()

  constructor(private questService: QuestionToggleService) {

  }

  toggleChoiceSelection(choice: FrageOption): void{
    this.questService.toggleChoiceSelectionSingle(choice);
  }
}
