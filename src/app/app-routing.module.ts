import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { CheckModeComponent } from './check-mode/check-mode.component';
import { ExamModeComponent } from './exam-mode/exam-mode.component';
import { StatistikComponent } from './Popup/statistik/statistik.component';
import { FilterComponent } from './Templates/filter/filter.component';
import { PrivacyPolicyComponent } from './Templates/privacy-policy/privacy-policy.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: LearningCenterComponent,},
  {path: 'learning-mode', loadChildren:() => import('./learning-mode/learning-mode.module').then(m=>m.LearningModeModule)},
  {path: 'check-mode/:katalog', component: CheckModeComponent},
  {path: 'exam-mode/:katalog', component: ExamModeComponent},
  {path: 'statistik', component: StatistikComponent},
  {path: 'filter', component:FilterComponent},
  {path: 'privacy', component:PrivacyPolicyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
