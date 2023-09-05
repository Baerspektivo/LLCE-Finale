import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleChoiceQuestionComponent } from '../Templates/single-choice-questeion/single-choice-questeion.component';
import { MultipleChoiceQuestionComponent } from '../Templates/multiple-choice-questeion/multiple-choice-questeion.component';
import { InputChoiceQuesteionComponent } from '../Templates/input-choice-questeion/input-choice-questeion.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    InputChoiceQuesteionComponent,
  ],
  exports:[
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    InputChoiceQuesteionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
