import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningModeRoutingModule } from './learning-mode-routing.module';
import { LearningModeComponent } from './learning-mode.component';
import { FragenlisteComponent } from './fragenliste/fragenliste.component';
import { EinzelfragenComponent } from './einzelfragen/einzelfragen.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    LearningModeComponent,
    FragenlisteComponent,
    EinzelfragenComponent,
  ],
  imports: [
    CommonModule,
    LearningModeRoutingModule,
    SharedModule,
  ]
})
export class LearningModeModule { }
