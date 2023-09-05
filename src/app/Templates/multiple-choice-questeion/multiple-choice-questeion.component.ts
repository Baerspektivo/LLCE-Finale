import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FrageOption } from '../../Model/frage-option';
import { QuestionToggleService } from '../../services/question-toggle.service';


@Component({
  selector: 'LL-multiple-choice-question',
  templateUrl: './multiple-choice-questeion.component.html',
  styleUrls: ['./multiple-choice-questeion.component.css']
})
export class MultipleChoiceQuestionComponent {
@Input() choices: FrageOption[] | undefined;
@Output() choiceSelectionToggle = new EventEmitter<FrageOption>();

constructor(private questService: QuestionToggleService) {

}

toggleChoiceSelection(choice: FrageOption): void{
  this.questService.toggleChoiceSelectionMulti(choice);
}


}
