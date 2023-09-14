import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FragenlisteComponent } from './fragenliste/fragenliste.component';
import { EinzelfragenComponent } from './einzelfragen/einzelfragen.component';
import { LearningModeComponent } from './learning-mode.component';

const routes: Routes = [
  { path: '', component: LearningModeComponent},
  { path: 'questionlist/:katalog', component: FragenlisteComponent},
  { path: 'singlequestion/:katalog', component: EinzelfragenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningModeRoutingModule { }
